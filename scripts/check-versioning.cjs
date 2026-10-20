const assert = require("node:assert/strict");
const fs = require("node:fs");
const { execFileSync } = require("node:child_process");
const manifest = JSON.parse(
  fs.readFileSync("versioned_docs/version-v1-origin.json"),
);
let checked = 0;
for (const [source, destination] of [
  ["docs", "versioned_docs/version-v1"],
  [
    "i18n/en/docusaurus-plugin-content-docs/current",
    "i18n/en/docusaurus-plugin-content-docs/version-v1",
  ],
  ["src/components", "src/v1/components"],
]) {
  const files = execFileSync(
    "git",
    ["ls-tree", "-r", "--name-only", manifest.ref, source],
    { encoding: "utf8" },
  )
    .trim()
    .split("\n");
  for (const path of files) {
    const target = destination + path.slice(source.length);
    let expected = execFileSync("git", ["show", `${manifest.ref}:${path}`]);
    if (/\.(mdx?|tsx?)$/.test(path))
      expected = Buffer.from(
        expected
          .toString()
          .replaceAll("@site/src/components/", "@site/src/v1/components/")
          .replaceAll("@site/src/format", "@site/src/v1/format"),
      );
    assert.deepEqual(
      fs.readFileSync(target),
      expected,
      `v1 changed: ${target}`,
    );
    checked++;
  }
}
assert.deepEqual(
  fs.readFileSync("src/v1/format.ts"),
  execFileSync("git", ["show", `${manifest.ref}:src/format.ts`]),
);
assert.deepEqual(JSON.parse(fs.readFileSync("versions.json")), ["v1"]);
const config = fs.readFileSync("docusaurus.config.ts", "utf8");
assert.match(config, /lastVersion:\s*['"]v1['"]/);
assert.match(config, /path:\s*['"]v2-beta['"]/);
console.log(
  `v1 preservation: ${checked + 1} files match deployed main ${manifest.ref}; beta has a separate route.`,
);
