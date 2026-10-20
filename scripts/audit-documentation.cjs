// Check canonical FR/EN coverage without accepting Docusaurus's silent FR fallback.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : /\.mdx?$/.test(e.name) ? [path.join(dir, e.name)] : []);
const frRoot = path.join(root, 'docs');
const enRoot = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
const relative = p => path.relative(frRoot, p);
const pages = walk(frRoot).map(p => {
  const fr = fs.readFileSync(p, 'utf8');
  const enPath = path.join(enRoot, relative(p));
  const en = fs.existsSync(enPath) ? fs.readFileSync(enPath, 'utf8') : '';
  const placeholder = /source of truth|intentionally short|version française fait foi|English version will|coming soon/i.test(en) && en.split(/\s+/).length < 150;
  return { path: relative(p), frenchWords: fr.split(/\s+/).length, englishWords: en ? en.split(/\s+/).length : 0, status: !en ? 'missing' : placeholder || en.split(/\s+/).length < 150 ? 'placeholder' : 'present' };
});
const report = { canonicalPages: pages.length, translatedPages: pages.filter(p => p.status === 'present').length, remaining: pages.filter(p => p.status !== 'present'), pages };
if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`Canonical translation coverage: ${report.translatedPages}/${report.canonicalPages}`);
  for (const p of report.remaining) console.log(`${p.status}: ${p.path}`);
  console.log('Presence is not proof of translation fidelity, scientific validation or rendered correctness.');
}
if (report.remaining.length) process.exitCode = 1;
