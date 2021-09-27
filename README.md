## cli

### 前置知识

- 默认node是支持require commonjs规范的  即不能在项目中esm模块规范import等 ---- **13.2**版本之后推出了原生2种解决方式
其他解决方式见[链接](https://zwkkkk1.blog.csdn.net/article/details/81564971)
  - 改写后缀名mjs 直接执行就可以
  - 将packagejson文件中改type为module即可 ---- 适用于13.2版本之后的版本
  - 13.2版本之前解决具体见 https://blog.csdn.net/qq_44162474/article/details/107929042

- 异步加载模块的知识点
```js
  // 在新版本nodejs13.2版本后 在nodejs文件的顶层作用域内可直/*  */接使用await关键字，不需要async的配合
  const {foo} = await import('./foo.js')
  // 动态加载返回的是个promise所以用await接入
```

- 需要安装的包
  - `npm i ejs`
  - `npm i inquirer` 是个开发命令行模式的三方包，有相关语法见官方文档
  - `npm i execa` 这个库是封装node的子进程api的三方库，在本项目中用它来执行安装依赖等命令的操作非常方便
  - `npm i prettier` 手动代码格式化
  - `npm i chalk` 日志自定义美化输出在命令行中

> 13.2新版本后的type为module的模式下 默认commonjs中的一些变量全都是未定义的如
 >- console.log（require, module.exports, exports, __dirname, __filename）都会获取不到，有import.meta.url方式获取路径
 >- 具体一些区别 见官方文档更全。。。。



### 正文

- readFileSync写文件的第二个参数 是填充内容的意思
- 用npm start都能跑通了自动生成模版文件并安装依赖后，现在要做的是如何用全局命令的执行并执行npm start的效果？
  1. 需要在package.json中添加一个bin字段了（后续命令行中输入命令会基于bin这个指定路径去执行命令）
  2. 根目录下创建一个bin文件夹内，然后把项目逻辑文件全部挪到bin文件夹里
  3. 然后bin值赋值为./bin/index.js
  4. 然后去bin/index.js文件中**顶行**指定你这个脚本应该用什么语言环境来进行执行这个indexjs脚本
  5. 然后用npm link 安装到本地全局上，来进行本地验证（可以用`npm root -g`查看根命令目录中是否含有刚才lint的项目来验证是否lint成功）
  6. 安后，用命令进行执行 这里的命令就是packagejson中的name值作为命令名字
- 命令行运行后发现之前项目里的引用过的相对路径会有问题 会报错 必须改成绝对路径。
  之前commonjs中引用绝对路径有__dirname全局变量，但在esm规范模式中没有它，我们可以利用一个工具函数生成一个dirname
  ```js
    import {fileURLToPath} from 'url';
    const __dirname = fileURLToPath(import.meta.url);
    // 然后用path模块的resolve方法生成最终的绝对路径
    path.resolve(__dirname, '../template/index.ejs')
  ```
- 写完包之后 ，可以通过npm publish发布出去

## 优化

- 【格式化】根据模版生成的代码格式乱，需要借助prettier包进行手动api调用格式化,去template文件中手动调用
- 【日志美化】chalk
