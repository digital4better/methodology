const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');

module.exports = function loadModel(file) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS},
  }).outputText;
  vm.runInNewContext(code, {exports, Intl, Math, Number, require: spec => {
    if (!spec.startsWith('.')) throw new Error(`Unexpected model dependency: ${spec}`);
    const target = path.resolve(path.dirname(file), spec);
    return target.endsWith('.json') ? {default: JSON.parse(fs.readFileSync(target))} : loadModel(target + '.ts');
  }});
  return exports;
};
