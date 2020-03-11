# vue脚手架
## 基础知识
vue cli致力于将vue生态中的工具基础标准化。这样可以让开发者专注于撰写应用代码，而不必花费大量时间解决开发配置的问题。

### cli服务：
在一个vue cli项目中，`@vue/cli-service`安装了一个名为`vue-cli-service`的命令。可以在npm scripts中以`vue-cli-service`或者在终端中以`./node_modules/.bin/vue-cli-service`访问这个命令。

vue-cli-service serve
```shell
vue-cli-service serve [options] [entry]

[options]：
--open：在启动时自动打开浏览器
--copy：在启动时将url复制到剪切板
--mode：指定环境模式
--host：指定host
--port：指定port
--https：使用https
```
vue-cli-service build
```shell
vue-cli-service build [options] [entry|pattern]

[options]：
--mode：指定环境模式
--dest：指定输出目录
--modern：为现代浏览器交付原生支持的 ES2015 代码，并生成一个兼容老浏览器的包用来自动回退。
--target：app | lib | wc | wc-async
--name
--no-clean：构建项目之前不清除目标目录
--report：生成report.html以帮助分析包内容
--report-json：生成report.json
```
`vue-cli-service inspect`：审查vue cli项目的webpack config

`npx vue-cli-service help`：查看所有可用的命令

### 开发
静态资源处理：
1. 通过相对路径引用，这类引用会被webpack处理
2. 放置在public目录下或通过绝对路径引用，这类引用会直接被拷贝，而不会经过webpack的处理

## 基本操作
### 初始化部分
安装和构建
```js
npm i -g @vue/cli

vue create vue-cli-demo
```