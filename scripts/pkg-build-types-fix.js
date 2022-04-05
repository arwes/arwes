// npm-dts has an error where the final "declare module '@arwes/[package]'"
// makes the wrong re-exports. This is a script to fix it.

const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);

const folderName = args[0];
const packageName = folderName === 'standalone' ? 'arwes' : `@arwes/${folderName}`;
const search = new RegExp(`declare module '${packageName}' {(.|\r?\n)+}`);
const fix = `
declare module '${packageName}' {
  import main = require('${packageName}/index');
  export = main;
}
`;
const typesFilePath = path.join(__dirname, '../packages', folderName, 'build/types/index.d.ts');
const typesContentCurrent = String(fs.readFileSync(typesFilePath));
const typesContentFix = typesContentCurrent.replace(search, fix);

fs.writeFileSync(typesFilePath, typesContentFix);
