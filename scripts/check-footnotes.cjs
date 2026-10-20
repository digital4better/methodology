// Audit the current FR/EN documentation, excluding frozen and legacy pages.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : entry.name.endsWith('.md') ? [path.join(dir, entry.name)] : []);
const frRoot = path.join(root, 'docs');
const enRoot = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
const problems = [];
let pages = 0, calls = 0;
for (const frenchPath of walk(frRoot)) {
  for (const file of [frenchPath, path.join(enRoot, path.relative(frRoot, frenchPath))]) {
    pages++;
    const source = fs.readFileSync(file, 'utf8');
    const definitions = [...source.matchAll(/^\[\^([^\]]+)\]: (.*)$/gm)];
    const body = source.replace(/^\[\^[^\]]+\]: .*$/gm, '');
    const used = [...body.matchAll(/\[\^([^\]]+)\]/g)].map(match => match[1]);
    calls += used.length;
    const defined = definitions.map(match => match[1]);
    const fail = reason => problems.push(`${path.relative(root, file)}: ${reason}`);
    if (new Set(defined).size !== defined.length) fail('duplicate definition');
    for (const id of new Set(used)) if (!defined.includes(id)) fail(`missing definition ${id}`);
    for (const [_, id, text] of definitions) {
      if (!used.includes(id)) fail(`unused definition ${id}`);
      if (/\[\^/.test(text)) fail(`nested footnote ${id}`);
      if (id.startsWith('rcp-') && !/https:\/\/librairie\.ademe\.fr\/.+p\. \d/.test(text)) fail(`RCP citation lacks link or page: ${id}`);
    }
    if (!file.endsWith('sources-et-corpus.md') && /^#{2,3} (Sources|Références|References)\s*$/m.test(body)) fail('manual bibliography heading remains');
    for (const block of source.matchAll(/```[\s\S]*?```|\$\$[\s\S]*?\$\$/g)) {
      if (/\[\^/.test(block[0])) fail('footnote inside code or math');
    }
  }
}
console.log(`Footnotes: ${pages} pages, ${calls} calls, ${problems.length} issues.`);
if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
