import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const readme = await readFile('README.md', 'utf8');
assert(!/Hi there|Here are some ideas|Snapshot generation pending|<script\b|<iframe\b|style=|onerror=/i.test(readme), 'Starter or unsupported HTML remains');
assert(!/github-readme-stats|capsule-render|readme-typing-svg|count_private/.test(readme), 'Runtime widget dependency remains');
assert.equal((readme.match(/<!-- public-stats:start -->/g) || []).length, 1);
assert.equal((readme.match(/<!-- public-stats:end -->/g) || []).length, 1);
const headings = [...readme.matchAll(/^#{1,6} (.+)$/gm)].map((m) => m[1].toLowerCase().replace(/[^\w -]/g, '').replaceAll(' ', '-'));
assert.equal(new Set(headings).size, headings.length, 'Duplicate headings');
const links = [...readme.matchAll(/(?:href|src|srcset)="([^"]+)"|\]\(([^)]+)\)/g)].map((m) => (m[1] || m[2]).replaceAll('&amp;', '&'));
const external = new Set();
for (const link of links) {
  if (/^https:\/\//.test(link)) { external.add(link.split('#')[0]); continue; }
  if (link.startsWith('#')) { assert(headings.includes(link.slice(1)), `Missing heading: ${link}`); continue; }
  assert(!/^[\w-]+:/.test(link), `Unsafe URL scheme: ${link}`);
  const path = resolve(root, link.split('#')[0]);
  assert(!relative(root, path).startsWith('..'), 'Link escapes repository');
  assert((await stat(path)).isFile(), `Missing local link: ${link}`);
}
for (const image of readme.matchAll(/<img\b[^>]*>/g)) {
  assert(/alt="[^"]{10,}"/.test(image[0]), 'Missing descriptive alt text');
}
for (const tag of ['picture', 'details', 'a', 'p']) {
  assert.equal((readme.match(new RegExp(`<${tag}(?:>|\\s)`, 'g')) || []).length,
    (readme.match(new RegExp(`</${tag}>`, 'g')) || []).length, `Unbalanced ${tag}`);
}
let svgCount = 0;
for (const file of await readdir('assets')) {
  const path = `assets/${file}`;
  assert((await stat(path)).size < 500_000, `Oversized asset: ${path}`);
  if (!file.endsWith('.svg')) continue;
  svgCount++;
  const svg = await readFile(path, 'utf8');
  assert(svg.startsWith('<svg') && svg.trimEnd().endsWith('</svg>'), `Malformed SVG envelope: ${path}`);
  assert(/viewBox="[^"]+"/.test(svg) && /<title\b/.test(svg) && /<desc\b/.test(svg), `Missing SVG accessibility metadata: ${path}`);
  assert(!/<script\b|<foreignObject\b|<!ENTITY|(?:href|src)="https?:|\bon\w+=/i.test(svg), `Active or external SVG content: ${path}`);
  if (file.startsWith('contributions-')) assert(!/@keyframes|animation\s*:/.test(svg), 'Reduced-motion SVG still animates');
}
const data = JSON.parse(await readFile('data/public-profile.json', 'utf8'));
assert(data.repositories.every((repo) => repo.url.startsWith('https://github.com/SHUBHRAGHAVT-57/')));
assert(readme.includes(`**${data.repositories.length} public repositories**`), 'Text and snapshot counts disagree');
assert(readme.includes(data.updated), 'Snapshot date missing from accessible text');
for (const file of await readdir('.github/workflows')) {
  const yaml = await readFile(`.github/workflows/${file}`, 'utf8');
  assert(!/pull_request_target|write-all|secrets\.[A-Z_]*PAT/.test(yaml), `Unsafe workflow: ${file}`);
  for (const use of yaml.matchAll(/uses:\s*([^\s#]+)/g)) assert(/@[0-9a-f]{40}$/.test(use[1]), `Unpinned action: ${use[1]}`);
  assert(/persist-credentials: false/.test(yaml), 'Checkout retains credentials');
  assert(/timeout-minutes: 5/.test(yaml), 'Workflow lacks a bounded runtime');
}
console.log(`PASS: README structure, ${links.length} references, ${svgCount} SVGs, snapshot consistency and workflow security policy`);

if (process.argv.includes('--links')) {
  let failures = 0;
  for (const url of external) {
    let status;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
        status = response.status;
        await response.body?.cancel();
        if (response.ok) break;
        if (![429, 500, 502, 503, 504].includes(status)) break;
      } catch { status = 'network failure'; }
      if (attempt < 2) await new Promise((done) => setTimeout(done, 1000 * (attempt + 1)));
    }
    console.log(`${status === 200 ? 'PASS' : 'FAIL'} ${status}: ${url}`);
    if (status !== 200) failures++;
  }
  assert.equal(failures, 0, `${failures} external links failed; inspect remote status before editing working links`);
  console.log(`PASS: ${external.size} unique external URLs`);
}
