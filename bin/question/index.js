import inquirer from "inquirer";
import packageName from "./packageName.js";
import port from "./port.js";
import middleware from "./middleware.js";

export default () => {
  // 借助三方命令行包开发nodejs交互示命令行程序   1. 他返回的是promise，可直接用await得到结果
  return inquirer.prompt([// 提示符功能 激进促进
    /* Pass your questions in here */
    packageName(),
    port(),
    middleware(),
  ]);
};
