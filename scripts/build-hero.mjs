import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('assets', { recursive: true });

// Owned SVG artwork: no remote renderer, JavaScript, font request or image service.
for (const mobile of [false, true]) {
  const width = mobile ? 600 : 1200;
  const height = mobile ? 450 : 360;
  const x = mobile ? 40 : 58;
  const art = mobile ? 'translate(404 2) scale(.49)' : 'translate(920 29) scale(.8)';
  const contours = Array.from({ length: 7 }, (_, i) => `<path d="M${width * .4 + i * 24} ${height + 45}Q${width * .68 + i * 11} ${height * .44} ${width + 50} ${45 + i * 30}" fill="none" stroke="#d6b6ff" stroke-opacity="${.05 + i * .014}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
<title id="title">Shubh Raghav · Software Developer</title>
<desc id="desc">Architecting ideas. Engineering experiences. Electric violet light trails and an animated geometric SR monogram. Motion stops when reduced motion is preferred.</desc>
<defs>
 <linearGradient id="bg" x2="1" y2=".5"><stop stop-color="#100b1c"/><stop offset=".56" stop-color="#281047"/><stop offset="1" stop-color="#56218a"/></linearGradient>
 <radialGradient id="glow"><stop stop-color="#a864f3" stop-opacity=".35"/><stop offset="1" stop-color="#a864f3" stop-opacity="0"/></radialGradient>
 <linearGradient id="ink" x2="1" y2="1"><stop stop-color="#f0e3ff"/><stop offset="1" stop-color="#b68aff"/></linearGradient>
 <linearGradient id="line"><stop stop-color="#a67bff" stop-opacity="0"/><stop offset=".5" stop-color="#dbb9ff"/><stop offset="1" stop-color="#a67bff" stop-opacity="0"/></linearGradient>
 <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#dec7ff" stroke-opacity=".06"/></pattern>
</defs>
<style>
.orbit{stroke-dasharray:3 17;animation:orbit 36s linear infinite;transform-origin:150px 150px}
.signal{stroke-dasharray:80 1100;animation:signal 12s linear infinite}
@keyframes orbit{to{transform:rotate(360deg)}}
@keyframes signal{to{stroke-dashoffset:-1180}}
@media(prefers-reduced-motion:reduce){.orbit,.signal{animation:none}}
</style>
<rect width="${width}" height="${height}" rx="18" fill="url(#bg)"/>
<rect width="${width}" height="${height}" rx="18" fill="url(#grid)"/>
<ellipse cx="${width * .85}" cy="${height * .5}" rx="${width * .5}" ry="${height}" fill="url(#glow)"/>
${contours}
<path class="signal" d="M0 ${height - 1}Q${width * .5} ${height - 2} ${width} ${height * .35}" fill="none" stroke="url(#line)" stroke-width="2"/>
<rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="18" fill="none" stroke="#9d6ace" stroke-opacity=".45"/>
<g transform="${art}" fill="none">
 <circle cx="150" cy="150" r="143" stroke="#dec4ff" stroke-opacity=".16"/>
 <circle class="orbit" cx="150" cy="150" r="124" stroke="#dfbfff" stroke-opacity=".5"/>
 <path d="M205 72H112L65 150H166L120 228H212M199 72L246 150L199 228M166 150H246" stroke="url(#ink)" stroke-width="16" stroke-linejoin="bevel"/>
 <circle cx="150" cy="7" r="4" fill="#efdbff"/>
</g>
<g font-family="Arial, Helvetica, sans-serif">
 <text x="${x}" y="${mobile ? 53 : 58}" fill="#e3c7ff" font-size="${mobile ? 19 : 17}" letter-spacing="3">SOFTWARE DEVELOPER</text>
 <path d="M${x} ${mobile ? 94 : 90}h46" stroke="#d5a7ff" stroke-width="3"/>
 <text x="${x - 3}" y="${mobile ? 184 : 184}" fill="#ffffff" font-weight="700" font-size="${mobile ? 72 : 90}" letter-spacing="-3">SHUBH${mobile ? '' : ' RAGHAV'}</text>
${mobile ? `<text x="${x - 3}" y="264" fill="#ffffff" font-weight="700" font-size="72" letter-spacing="-3">RAGHAV</text>` : ''}
 <text x="${x}" y="${mobile ? 326 : 242}" fill="#e7d7f6" font-size="${mobile ? 26 : 26}">Architecting ideas.</text>
 <text x="${mobile ? x : 300}" y="${mobile ? 362 : 242}" fill="#e7d7f6" font-size="26">Engineering experiences.</text>
 <text x="${x}" y="${height - 34}" fill="#d8c1ed" font-size="${mobile ? 17 : 17}" letter-spacing="3">BUILD / REFINE / REPEAT</text>
</g>
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
