import ejs from 'ejs';
import fs from 'fs';
import {fileURLToPath} from 'url';
import path from 'path';
import prettier from "prettier";
const __dirname = fileURLToPath(import.meta.url);
export default (config) => {
  const __dirname = fileURLToPath(import.meta.url);
  // 这块注意，得写成../,否则path拼接路径会错拼为/Users/jinyan/Desktop/self/teach-koa-setup/koa-template-cli/bin/createIndexTemplate.js/template/index.ejs
  const indexTemplate = fs.readFileSync(path.resolve(__dirname, '../template/index.ejs'))
  const code = ejs.render(indexTemplate.toString(), {
    middleware: config.middleware,
    port: config.port,
  })
  return prettier.format(code, { parser: "babel" });
}