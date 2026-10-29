import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { summarize, renderStats, escapeXml } from './profile.mjs';

const repo = { name: 'example', private: false, fork: false, archived: false,
  html_url: 'https://github.com/SHUBHRAGHAVT-57/example', stargazers_count: 3 };

test('rejects private and malformed evidence rather than publishing it', () => {
  assert.throws(() => summarize([{ ...repo, private: true }], {}, '2026-10-29'), /public/);
  assert.throws(() => summarize([{ ...repo, stargazers_count: -1 }], {}, '2026-10-29'), /public/);
  assert.throws(() => summarize([repo], { TypeScript: -1 }, '2026-10-29'), /bytes/);
  assert.throws(() => summarize([repo], {}, 'tomorrow'), /date/);
});

test('language proportions use real byte counts and exclude zero values', () => {
  const result = summarize([repo], { TypeScript: 300, CSS: 100, HTML: 0 }, '2026-10-29');
  assert.equal(result.repositories.length, 1);
  assert.equal(result.stars, 3);
  assert.deepEqual(result.languages.map(({ name, percent }) => [name, percent]), [['TypeScript', 75], ['CSS', 25]]);
  assert.equal(result.totalBytes, 400);
});

test('zero public source has an explicit empty state without NaN', () => {
  const svg = renderStats(summarize([], {}, '2026-10-29'), 'light');
  assert.match(svg, /No public language data/);
  assert.doesNotMatch(svg, /NaN|Infinity/);
});

test('XML labels cannot inject SVG markup', () => {
  assert.equal(escapeXml('<script>"&'), '&lt;script&gt;&quot;&amp;');
  const svg = renderStats(summarize([repo], { '<script>': 100 }, '2026-10-29'), 'dark');
  assert.doesNotMatch(svg, /<script>/);
  assert.match(svg, /&lt;script&gt;/);
  assert.match(svg, /<title/);
  assert.match(svg, /<desc/);
});

for (const scenario of ['rate-limit', 'later-page-failure', 'language-failure']) {
  test(`a ${scenario} preserves every checked-in snapshot`, () => {
    const paths = ['README.md', 'data/public-profile.json', 'assets/stats-dark.svg', 'assets/stats-light.svg'];
    const before = paths.map((path) => readFileSync(path, 'utf8'));
    const fixture = JSON.stringify(repo);
    const source = `
      global.fetch = async (url) => {
        if (${JSON.stringify(scenario)} === 'rate-limit') return new Response('{}', { status: 429 });
        if (url.includes('/languages')) return new Response('{}', { status: 503 });
        if (${JSON.stringify(scenario)} === 'later-page-failure' && url.includes('page=2')) return new Response('{}', { status: 500 });
        return new Response(JSON.stringify(${JSON.stringify(scenario)} === 'later-page-failure' ? Array.from({length:100}, () => (${fixture})) : [${fixture}]), { status: 200 });
      };
      await import(${JSON.stringify(new URL('./update-stats.mjs', import.meta.url).href)});
    `;
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', source], { encoding: 'utf8', timeout: 10000 });
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /previous snapshots retained/);
    assert.deepEqual(paths.map((path) => readFileSync(path, 'utf8')), before);
  });
}
