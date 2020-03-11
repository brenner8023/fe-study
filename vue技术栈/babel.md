# Babel
> https://astexplorer.net/

Babel是一个JavaScript编译器，用于将ecmascript2015+版本的代码转换为向后兼容的js语法，以便能够运行在当前版本和旧版本的浏览器或其它环境中。

基本原理：首先将源码转成抽象语法树，然后对语法树进行处理生成新的语法树，最后将新语法树生成新的js代码。Babel本身只负责编译新标准引入的新语法，比如箭头函数、`class`、`es module`等，它不会编译原生对象新引入的方法，比如`Array.includes`、`Map`、`Set`等，这些需要通过Polyfill来解决。

安装：
1. `npm i -S @babel/cli`内建命令行工具
2. `npm i -S @babel/core`

babel的4种配置文件方式：
1. `babel.config.js`
2. `.babelrc`
3. `.babelrc.js`
4. `package.json`

## plugin
插件是用来定义如何转换你的代码的。插件在presets前运行。插件的执行顺序是从左往右执行。

## presets
预设是一堆插件的组合，用来达到某种转译的能力。预设的执行顺序是从右往左。