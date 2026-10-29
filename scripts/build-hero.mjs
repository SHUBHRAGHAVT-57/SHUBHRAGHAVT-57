import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('assets', { recursive: true });
for (const mobile of [false, true]) {
  const width = mobile ? 600 : 1200;
  const height = mobile ? 470 : 400;
  const x = mobile ? 38 : 64;
  const art = mobile ? 'translate(400 20) scale(.42)' : 'translate(850 70) scale(.86)';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
<title id="title">Shubh Raghav · Software Developer</title>
<desc id="desc">Architecting ideas. Engineering experiences. A midnight panel with a lavender interlocking geometric monogram.</desc>
<defs>
 <linearGradient id="bg" x2="1" y2="1"><stop stop-color="#0c0b13"/><stop offset="1" stop-color="#1e1334"/></linearGradient>
 <linearGradient id="ink" x2="1" y2="1"><stop stop-color="#e0d5ff"/><stop offset="1" stop-color="#9670ed"/></linearGradient>
 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#c4afff" stroke-opacity=".045"/></pattern>
</defs>
<rect width="${width}" height="${height}" rx="20" fill="url(#bg)"/>
<rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="20" fill="url(#grid)" stroke="#49345e"/>
<path d="M${x} 0V${height}" stroke="#9c7be4" stroke-opacity=".12"/>
<g transform="${art}" fill="none">
 <circle cx="150" cy="150" r="146" stroke="#b89af4" stroke-opacity=".16"/>
 <circle cx="150" cy="150" r="113" stroke="#b89af4" stroke-opacity=".08"/>
 <path d="M-12 150H312M150 -12V312" stroke="#b89af4" stroke-opacity=".12"/>
 <path d="M205 72H112L65 150H166L120 228H212" stroke="url(#ink)" stroke-width="17" stroke-linejoin="bevel"/>
 <path d="M199 72L246 150L199 228M166 150H246" stroke="url(#ink)" stroke-width="17" stroke-linejoin="bevel"/>
 <circle cx="150" cy="4" r="4" fill="#c4a6ff"/>
 <circle cx="296" cy="150" r="3" fill="#c4a6ff"/>
</g>
<g font-family="Arial, Helvetica, sans-serif">
 <text x="${x}" y="${mobile ? 64 : 70}" fill="#c9b3fa" font-size="${mobile ? 18 : 15}" letter-spacing="3">SOFTWARE DEVELOPER</text>
 <path d="M${x} ${mobile ? 127 : 109}h42" stroke="#b28bf7" stroke-width="3"/>
 <text x="${x - 3}" y="${mobile ? 212 : 207}" fill="#f3efff" font-weight="700" font-size="${mobile ? 64 : 82}" letter-spacing="-3">SHUBH${mobile ? '' : ' RAGHAV'}</text>
${mobile ? `<text x="${x - 3}" y="285" fill="#f3efff" font-weight="700" font-size="64" letter-spacing="-3">RAGHAV</text>` : ''}
 <text x="${x}" y="${mobile ? 350 : 265}" fill="#d5cce4" font-size="${mobile ? 25 : 25}">Architecting ideas.</text>
 <text x="${mobile ? x : 295}" y="${mobile ? 384 : 265}" fill="#d5cce4" font-size="25">Engineering experiences.</text>
 <text x="${x}" y="${height - 38}" fill="#a69ab7" font-size="${mobile ? 16 : 14}" letter-spacing="2">THOUGHTFUL SOFTWARE. PURPOSEFUL DETAILS.</text>
</g>
</svg>\n`;
  await writeFile(`assets/hero${mobile ? '-mobile' : ''}.svg`, svg);
}
console.log('Generated desktop and mobile hero artwork');
