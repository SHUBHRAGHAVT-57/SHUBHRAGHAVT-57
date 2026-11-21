import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('assets', { recursive: true });

const monogram = 'M205 72H112L65 150H166L120 228H212M199 72L246 150L199 228M166 150H246';

function dialTicks() {
  return Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0;
    return `<path transform="rotate(${i * 6} 150 150)" d="M150 13v${major ? 8 : 3}" stroke="#f1dfff" stroke-opacity="${major ? .7 : .24}"/>`;
  }).join('\n');
}

function lightTrails(width, height) {
  return Array.from({ length: 28 }, (_, i) => {
    const startY = Math.round(height * .92) + i * 3;
    const peak = Math.round(height * .55) - i * 4;
    const endY = Math.round(height * .39) - i * 6;
    return `<path d="M${width * .34} ${startY} C${width * .62} ${height + 45},${width * .61} ${peak},${width + 6} ${endY}" />`;
  }).join('\n');
}

for (const mobile of [false, true]) {
  const width = mobile ? 600 : 1200;
  const height = mobile ? 450 : 360;
  const x = mobile ? 40 : 58;
  const dial = mobile ? 'translate(386 12) scale(.62)' : 'translate(830 13) scale(1.10)';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
<title id="title">Shubh Raghav · Software Developer</title>
<desc id="desc">A silver and violet SR monogram on an engraved dial, with a slowly turning outer ring and fine violet light trails. Reduced motion holds the artwork still.</desc>
<defs>
  <linearGradient id="ground" x2="1" y2=".35"><stop stop-color="#100c1a"/><stop offset=".48" stop-color="#26133e"/><stop offset="1" stop-color="#482665"/></linearGradient>
  <radialGradient id="wash"><stop stop-color="#b97af9" stop-opacity=".48"/><stop offset=".6" stop-color="#9e55e4" stop-opacity=".16"/><stop offset="1" stop-color="#a75af3" stop-opacity="0"/></radialGradient>
  <linearGradient id="trail"><stop stop-color="#a464d4" stop-opacity="0"/><stop offset=".38" stop-color="#c082e9" stop-opacity=".25"/><stop offset=".72" stop-color="#d69bfb" stop-opacity=".47"/><stop offset="1" stop-color="#9679d5" stop-opacity=".12"/></linearGradient>
  <radialGradient id="enamel" cx=".32" cy=".19" r=".95"><stop stop-color="#785595"/><stop offset=".32" stop-color="#4b315f"/><stop offset=".73" stop-color="#251631"/><stop offset="1" stop-color="#54396a"/></radialGradient>
  <linearGradient id="rim" x1="0" y1=".1" x2=".86" y2=".95"><stop stop-color="#fff1ff"/><stop offset=".19" stop-color="#ae82cf"/><stop offset=".4" stop-color="#422d51"/><stop offset=".58" stop-color="#d7b4f6"/><stop offset=".78" stop-color="#6f5284"/><stop offset="1" stop-color="#e5c7ff"/></linearGradient>
  <linearGradient id="silver" x1=".1" y1="0" x2=".87" y2="1"><stop stop-color="#fff8ff"/><stop offset=".34" stop-color="#efdfff"/><stop offset=".49" stop-color="#c29ad9"/><stop offset=".52" stop-color="#f7eaff"/><stop offset=".78" stop-color="#ceaae9"/><stop offset="1" stop-color="#9661c4"/></linearGradient>
  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".9" fill="#ebd8ff" opacity=".19"/></pattern>
  <clipPath id="frame"><rect width="${width}" height="${height}" rx="18"/></clipPath>
</defs>
<style>
  .index-ring{transform-origin:150px 150px;animation:turn 64s linear infinite}
  .signal{stroke-dasharray:64 1500;animation:drift 14s linear infinite}
  @keyframes turn{to{transform:rotate(360deg)}}
  @keyframes drift{to{stroke-dashoffset:-1564}}
  @media(prefers-reduced-motion:reduce){.index-ring,.signal{animation:none}}
</style>
<g clip-path="url(#frame)">
  <rect width="${width}" height="${height}" fill="url(#ground)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <ellipse cx="${width * .84}" cy="${height * .47}" rx="${width * .42}" ry="${height * .93}" fill="url(#wash)"/>
  <g fill="none" stroke="url(#trail)" stroke-width="1">${lightTrails(width, height)}</g>
  <path class="signal" d="M${width * .36} ${height + 10}Q${width * .66} ${height + 5} ${width + 10} 36" fill="none" stroke="#d9b0ff" stroke-opacity=".6" stroke-width="1.4"/>
  <g transform="${dial}">
    <circle cx="151" cy="157" r="136" fill="#12091d" opacity=".5"/>
    <circle cx="150" cy="150" r="140" fill="#2d1c3a" stroke="url(#rim)" stroke-width="3"/>
    <circle cx="150" cy="150" r="121" fill="url(#enamel)" stroke="url(#rim)" stroke-width="2"/>
    <g fill="none" stroke="#e3c5fa" stroke-opacity=".11"><circle cx="150" cy="150" r="113"/><circle cx="150" cy="150" r="110"/><circle cx="150" cy="150" r="107"/></g>
    <g class="index-ring">${dialTicks()}<circle cx="150" cy="17" r="2.4" fill="#fff2ff"/></g>
    <g fill="none" stroke-linejoin="bevel" stroke-linecap="square">
      <path d="${monogram}" transform="translate(0 7)" stroke="#201327" stroke-width="19"/>
      <path d="${monogram}" transform="translate(0 4)" stroke="#805894" stroke-width="17"/>
      <path d="${monogram}" stroke="url(#silver)" stroke-width="16"/>
    </g>
  </g>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="${x}" y="${mobile ? 53 : 58}" fill="#ebd3ff" font-size="${mobile ? 19 : 17}" letter-spacing="3">SOFTWARE DEVELOPER</text>
    <path d="M${x} 90h46" stroke="#cc9eff" stroke-width="3"/>
    <text x="${x - 3}" y="184" fill="#fffafa" font-size="${mobile ? 72 : 90}" font-weight="700" letter-spacing="-3">SHUBH${mobile ? '' : ' RAGHAV'}</text>
    ${mobile ? '<text x="37" y="264" fill="#fffafa" font-size="72" font-weight="700" letter-spacing="-3">RAGHAV</text>' : ''}
    <text x="${x}" y="${mobile ? 326 : 242}" fill="#e9d9f3" font-size="26">Architecting ideas.${mobile ? '' : ' Engineering experiences.'}</text>
    ${mobile ? '<text x="40" y="362" fill="#e9d9f3" font-size="26">Engineering experiences.</text>' : ''}
    <text x="${x}" y="${height - 34}" fill="#d8c1ed" font-size="17" letter-spacing="3">BUILD / REFINE / REPEAT</text>
  </g>
</g>
<rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="18" fill="none" stroke="#b78bd3" stroke-opacity=".45"/>
</svg>\n`;
  await writeFile(`assets/hero${mobile ? '-mobile' : ''}.svg`, svg);
}

await writeFile('assets/intro.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="56" viewBox="0 0 520 56" role="img" aria-labelledby="title desc">
<title id="title">Software, built with intent.</title><desc id="desc">An animated introduction cycles between Software, built with intent and Ideas into experiences. Reduced motion shows the first phrase.</desc>
<defs><clipPath id="typing"><rect class="reveal" x="48" y="0" width="424" height="56"/></clipPath></defs>
<style>
text{font-family:Consolas,Menlo,monospace;font-size:26px;fill:#8b5ec5}
@media(prefers-color-scheme:dark){text{fill:#c6a1fa}}
.reveal{animation:type 10s steps(26,end) infinite}.first{animation:first 10s step-end infinite}.second{opacity:0;animation:second 10s step-end infinite}
@keyframes type{0%,20%,70%,90%{width:424px}40%,50%,100%{width:0}}
@keyframes first{0%,100%{opacity:1}50%{opacity:0}}
@keyframes second{0%,100%{opacity:0}50%{opacity:1}}
@media(prefers-reduced-motion:reduce){.reveal,.first,.second{animation:none}.first{opacity:1}.second{display:none}}
</style>
<g clip-path="url(#typing)"><text class="first" x="48" y="36">Software, built with intent.</text><text class="second" x="48" y="36">Ideas into experiences.</text></g>
</svg>\n`);

for (const [file, label, filled] of [['cta-github', 'GITHUB PROFILE', false], ['cta-demo', 'TRY KEYTURN', true], ['cta-source', 'VIEW SOURCE', false]]) {
  const width = file === 'cta-github' ? 164 : 142;
  await writeFile(`assets/${file}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="36" viewBox="0 0 ${width} 36" role="img" aria-labelledby="title desc"><title id="title">${label}</title><desc id="desc">Professional link for Shubh Raghav's public work.</desc><rect x=".5" y=".5" width="${width - 1}" height="35" rx="6" fill="${filled ? '#8051c6' : '#21172f'}" stroke="${filled ? '#b68aef' : '#6d4a90'}"/><text x="${width / 2}" y="23" text-anchor="middle" fill="#fff" font-family="Arial,Helvetica,sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">${label} ↗</text></svg>\n`);
}

await writeFile('assets/footer.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="116" viewBox="0 0 600 116" role="img" aria-labelledby="title desc"><title id="title">Thoughtful software. Purposeful details.</title><desc id="desc">Shubh Raghav — build, refine, repeat.</desc><defs><linearGradient id="footer"><stop stop-color="#4e2876" stop-opacity="0"/><stop offset=".5" stop-color="#a778eb"/><stop offset="1" stop-color="#4e2876" stop-opacity="0"/></linearGradient></defs><path d="M0 8H600" stroke="url(#footer)"/><text x="300" y="63" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="25" font-weight="700" fill="#9b6bd4">Thoughtful software. Purposeful details.</text><text x="300" y="94" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="16" letter-spacing="3" fill="#9474b0">SHUBH RAGHAV</text></svg>\n`);
console.log('Generated animated desktop/mobile hero, typing introduction, link buttons and footer');
