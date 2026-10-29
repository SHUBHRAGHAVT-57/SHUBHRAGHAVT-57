import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { owner, summarize, renderStats } from './profile.mjs';

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status} for ${path}; previous snapshots retained`);
  return response.json();
}

// Explicit public-user endpoint, never the authenticated /user/repos endpoint.
const repositories = [];
for (let page = 1; ; page++) {
  const batch = await github(`/users/${owner}/repos?type=owner&per_page=100&page=${page}`);
  if (!Array.isArray(batch)) throw new Error('Unexpected public repository response');
  repositories.push(...batch);
  if (batch.length < 100) break;
  if (page >= 100) throw new Error('Pagination safety limit exceeded');
}
if (repositories.some((repo) => repo.private !== false)) throw new Error('Refusing non-public repository evidence');
const languageBytes = {};
for (const repo of repositories.filter((item) => !item.fork)) {
  const languages = await github(`/repos/${owner}/${encodeURIComponent(repo.name)}/languages`);
  for (const [name, bytes] of Object.entries(languages)) {
    if (!Number.isSafeInteger(bytes) || bytes < 0) throw new Error('Invalid language response');
    languageBytes[name] = (languageBytes[name] ?? 0) + bytes;
  }
}
const data = summarize(repositories, languageBytes, new Date().toISOString().slice(0, 10));
const readme = await readFile('README.md', 'utf8');
const statsBlock = /<!-- public-stats:start -->[\s\S]*?<!-- public-stats:end -->/;
if (!statsBlock.test(readme)) throw new Error('README snapshot markers are missing');
const text = `<!-- public-stats:start -->\nUpdated **${data.updated} UTC**: **${data.repositories.length} public repositories**, **${data.stars} stars**.\n\n${data.languages.map((lang) => `${lang.name}: ${lang.percent.toFixed(1)}%`).join(' · ') || 'No public language data.'}\n<!-- public-stats:end -->`;
const files = {
  'data/public-profile.json': `${JSON.stringify(data, null, 2)}\n`,
  'assets/stats-dark.svg': renderStats(data, 'dark'),
  'assets/stats-light.svg': renderStats(data, 'light'),
  'README.md': readme.replace(statsBlock, text),
};
// Fetch and render everything before touching files. CI only commits a successful complete run.
await mkdir('assets', { recursive: true });
await mkdir('data', { recursive: true });
for (const [path, contents] of Object.entries(files)) await writeFile(path, contents);
console.log(`Generated public snapshot: ${data.repositories.length} repositories, ${data.languages.length} languages, ${data.updated}`);
