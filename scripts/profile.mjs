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
  const bg = dark ? '#11101c' : '#f7f5fc';
  const fg = dark ? '#f0ecff' : '#241639';
  const muted = dark ? '#b8b2cb' : '#625674';
  const colors = ['#a78bfa', '#7960cc', '#c0acf0', '#59427c', '#c9c0d7'];
  let offset = 30;
  const bars = data.languages.map((lang, i) => {
    const width = lang.bytes / data.totalBytes * 540;
    const rect = `<rect x="${offset.toFixed(3)}" y="156" width="${width.toFixed(3)}" height="12" fill="${colors[i % colors.length]}"/>`;
    offset += width;
    return rect;
  }).join('');
  // A single compact legend stays readable on mobile. Group long tails honestly.
  const legend = data.languages.slice(0, data.languages.length <= 4 ? 4 : 3);
  const remainder = data.languages.slice(legend.length).reduce((sum, lang) => sum + lang.percent, 0);
  const labels = legend.map((lang) => `${lang.name} ${lang.percent.toFixed(1)}%`);
  if (remainder) labels.push(`Other ${remainder.toFixed(1)}%`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="282" viewBox="0 0 600 282" role="img" aria-labelledby="title desc">
<title id="title">Public GitHub snapshot · ${data.updated}</title>
<desc id="desc">${data.repositories.length} public repositories, ${data.stars} stars. ${escapeXml(labels.join(', ') || 'No public language data')}. Language shares measure source bytes, not proficiency.</desc>
<rect x=".5" y=".5" width="599" height="281" rx="16" fill="${bg}" stroke="${dark ? '#30263f' : '#e1d9ee'}"/>
<g font-family="Arial, Helvetica, sans-serif" fill="${fg}">
<text x="30" y="38" font-size="16" letter-spacing="2" fill="${muted}">PUBLIC SOURCE / SNAPSHOT</text>
<text x="30" y="98" font-size="42" font-weight="700">${data.repositories.length}<tspan dx="12" font-size="20" font-weight="400">repositories</tspan></text>
<text x="350" y="98" font-size="42" font-weight="700">${data.stars}<tspan dx="12" font-size="20" font-weight="400">stars</tspan></text>
<text x="30" y="136" font-size="16" fill="${muted}">SOURCE LANGUAGE MIX</text>
${bars}
<text x="30" y="198" font-size="17">${escapeXml(labels.slice(0, 2).join('   /   ') || 'No public language data')}</text>
<text x="30" y="225" font-size="17">${escapeXml(labels.slice(2).join('   /   '))}</text>
<text x="30" y="260" font-size="14" fill="${muted}">Updated ${data.updated} UTC · source bytes, not proficiency</text>
</g></svg>\n`;
}
