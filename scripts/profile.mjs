export const owner = 'SHUBHRAGHAVT-57';
export const escapeXml = (value) => String(value).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);

export function summarize(repositories, languageBytes, updated) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(updated) || Number.isNaN(Date.parse(updated))) throw new Error('Invalid snapshot date');
  if (!Array.isArray(repositories) || repositories.some((repo) => repo.private !== false ||
      !repo.html_url?.startsWith(`https://github.com/${owner}/`) || !Number.isSafeInteger(repo.stargazers_count) || repo.stargazers_count < 0)) {
    throw new Error('Only verified public repository evidence is accepted');
  }
  if (Object.values(languageBytes).some((n) => !Number.isSafeInteger(n) || n < 0)) throw new Error('Invalid language bytes');
  const totalBytes = Object.values(languageBytes).reduce((a, b) => a + b, 0);
  return {
    updated,
    source: `https://api.github.com/users/${owner}/repos`,
    repositories: repositories.map(({ name, html_url, fork, archived }) => ({ name, url: html_url, fork, archived })),
    stars: repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    totalBytes,
    languageScope: 'GitHub Linguist bytes across public, non-fork repositories; not a measure of proficiency.',
    languages: Object.entries(languageBytes).filter(([, bytes]) => bytes > 0)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, bytes]) => ({ name, bytes, percent: Number((bytes / totalBytes * 100).toFixed(2)) })),
  };
}

export function renderStats(data, theme) {
  const dark = theme === 'dark';
  const bg = dark ? '#171021' : '#f7f3fc';
  const fg = dark ? '#f0ecff' : '#241639';
  const muted = dark ? '#b8b2cb' : '#625674';
  const colors = ['#a78bfa', '#7960cc', '#c0acf0', '#59427c', '#c9c0d7'];
  const languageColors = { TypeScript: '#4b9bd3', CSS: '#a67cda', JavaScript: '#dfce59', HTML: '#df8767' };
  let offset = 30;
  const bars = data.languages.map((lang, i) => {
    const width = lang.bytes / data.totalBytes * 540;
    const rect = `<rect x="${offset.toFixed(3)}" y="143" width="${width.toFixed(3)}" height="14" fill="${languageColors[lang.name] || colors[i % colors.length]}"/>`;
    offset += width;
    return rect;
  }).join('');
  // A single compact legend stays readable on mobile. Group long tails honestly.
  const legend = data.languages.slice(0, data.languages.length <= 4 ? 4 : 3);
  const remainder = data.languages.slice(legend.length).reduce((sum, lang) => sum + lang.percent, 0);
  const labels = legend.map((lang) => `${lang.name} ${lang.percent.toFixed(1)}%`);
  if (remainder) labels.push(`Other ${remainder.toFixed(1)}%`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="290" viewBox="0 0 600 290" role="img" aria-labelledby="title desc">
<title id="title">Public GitHub snapshot · ${data.updated}</title>
<desc id="desc">${data.repositories.length} public repositories, ${data.stars} stars. ${escapeXml(labels.join(', ') || 'No public language data')}. Language shares measure source bytes, not proficiency.</desc>
<rect x=".5" y=".5" width="599" height="289" rx="16" fill="${bg}" stroke="${dark ? '#513268' : '#ddcdeb'}"/>
<path d="M30 12H570" stroke="${dark ? '#a475d9' : '#9b6acd'}" stroke-width="2"/>
<g font-family="Arial, Helvetica, sans-serif" fill="${fg}">
<text x="30" y="43" font-size="16" letter-spacing="2" fill="${muted}">PUBLIC CODE / SNAPSHOT</text>
<text x="30" y="88" font-size="31" font-weight="700">Languages in the open.</text>
<text x="30" y="119" font-size="18" fill="${muted}">${data.repositories.length} public repositories · ${data.stars} stars</text>
${bars}
<text x="30" y="194" font-size="19">${escapeXml(labels.slice(0, 2).join('   /   ') || 'No public language data')}</text>
<text x="30" y="225" font-size="19">${escapeXml(labels.slice(2).join('   /   '))}</text>
<text x="30" y="271" font-size="14" fill="${muted}">Updated ${data.updated} UTC · source bytes, not proficiency</text>
</g></svg>\n`;
}
