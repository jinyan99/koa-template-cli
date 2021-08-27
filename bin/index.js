#! /usr/bin/env node
// fs
import fs from "fs";
import execa from "execa";
import path from 'path';
import createIndexTemplate from './createIndexTemplate.js';
import createPackageTemplate from './createPackageTemplate.js';
import question from "./question/index.js";
import {createConfig} from './config.js';
import chalk from 'chalk'

// util
function getRootPath() {
  return path.resolve(process.cwd(), inputConfig.packageName)
}


/**
 * 我们写程序：讲究3个步骤：input输入(如命令行输入等) - process处理 - output输出（就是用fs磁盘写出文件）
 */
const answer = await question();
console.log(answer,'\n\n------🥰🥰🥰-------')
// // 后续就是由我们的输入程序生成这个inputConfig就行了
// const inputConfig = {
//   packageName: answer.packageName,
//   port: answer.port,
//   middleware: {
//     static: haveMiddleware('koa-static'),
//     router: haveMiddleware('koa-router')
//   }
// }
const inputConfig = createConfig(answer);


// 1. 创建文件夹 hei
console.log(chalk.blue(`创建项目文件夹:${inputConfig.packageName}`))
fs.mkdirSync(getRootPath());

// 2. 创建入口文件 indexjs
console.log(chalk.blue(`创建 index.js`))
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(inputConfig));// 2参是写入内容的内容参数

// 3. 创建packagejson
console.log(chalk.blue(`创建 package.json`))
fs.writeFileSync(`${getRootPath()}/package.json`, createPackageTemplate(inputConfig))

// 4. 安装依赖
console.log(chalk.blue(`安装依赖`))
execa("yarn", {
  // 子进程执行yarn命令-------- @TODO 这块直接用npm 还安装不了 得看看文档，yarn这样写可以直接调用install命令
  cwd: getRootPath(), // 目标路径下执行yarn命令
  stdio: [2, 2, 2], // 告诉我们的子进程继承我们的父进程的进度 就能安装时显示出主进程的进度条了
});
