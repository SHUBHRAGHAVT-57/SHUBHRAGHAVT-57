// Add accessibility metadata and a true reduced-motion fallback to Platane/snk output.
import { readFile, writeFile } from 'node:fs/promises';
for (const theme of ['dark', 'light']) {
  const path = `assets/snake-${theme}.svg`;
  let svg = await readFile(path, 'utf8');
  if (!svg.includes('<svg') || !svg.includes('@keyframes')) throw new Error(`Incomplete snake output: ${path}`);
  svg = svg.replace(/<title id="snake-title">[\s\S]*?<\/title>/, '').replace(/<desc id="snake-desc">[\s\S]*?<\/desc>/, '')
    .replace(/ role="img" aria-labelledby="snake-title snake-desc"/, '');
  const metadata = '<title id="snake-title">GitHub contribution snake</title><desc id="snake-desc">A snake traverses the contribution calendar. This visual uses actual GitHub contribution levels; it is not a productivity score.</desc>';
  svg = svg.replace(/<svg\b([^>]*)>/, '<svg$1 role="img" aria-labelledby="snake-title snake-desc">' + metadata);
  await writeFile(path, svg);
  // Removing animation rules leaves the original, uneaten contribution cells in place.
  // Select the static image through picture media, so no animation runs for reduced motion.
  const staticSvg = svg.replace('GitHub contribution snake</title>', 'GitHub contribution calendar</title>')
    .replace('A snake traverses the contribution calendar.', 'Static view of the contribution calendar.')
    .replace(/<style>[\s\S]*?<\/style>/g, (style) => {
    let result = style;
    for (let index = result.indexOf('@keyframes'); index !== -1; index = result.indexOf('@keyframes')) {
      const start = result.indexOf('{', index);
      let depth = 1, end = start + 1;
      while (depth && end < result.length) { if (result[end] === '{') depth++; if (result[end] === '}') depth--; end++; }
      if (depth) throw new Error('Unbalanced snake animation CSS');
      result = result.slice(0, index) + result.slice(end);
    }
    return result.replace(/animation(?:-[\w-]+)?\s*:[^;}]+;?/g, '').replace(/\.s\{[^}]*\}/g, '.s{display:none}');
  });
  await writeFile(`assets/contributions-${theme}.svg`, staticSvg);
}
console.log('Prepared accessible snake and static contribution assets');
