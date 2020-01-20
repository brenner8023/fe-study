# JavaScript模块化
[前端模块化开发](https://github.com/huxpro/js-module-7day/)
将一个复杂的程序依据一定的规则封装成几个块（文件），并组合在一起。块的内部实现是私有的，只是向外暴露一些接口（方法）与外部其它模块通信。

当两个模块用相同的名字来定义全局属性的时候, 就会发生名字空间冲突: 一个模块会覆盖掉另一个模块的属性,一个模块或者两个都不能正确地运行.

模块化的好处
- 避免命名冲突
- 更好地分离，按需加载
- 高代码可维护性

## 模块化规范
- CommonJS
- AMD
- CMD
- ES6 Module

### CommonJS
CommonJS是一个更偏向于服务器端的规范。NodeJS采用了这个规范。CommonJS的一个模块就是一个脚本文件。require命令第一次加载该脚本时就会执行整个脚本，然后在内存中生成一个对象。
```js
{
    id: '...', // 模块名
    exports: { ... }, // 该模块导出的接口
    loaded: true, // 表示该模块是否加载完毕
    ...
}
```
以后再需要用到这个模块时，就会到exports属性取值，即使再次执行require，也不会执行该模块，而是到缓存中取值。
CommonJS是运行时同步加载的，在浏览器端模块需要提前编译打包处理，对于浏览器而言，它需要从服务器端加载模块，涉及到网速等原因，一旦等待时间过长，浏览器就处于假死状态
CommonJS模块输出的是值的拷贝，一旦输出这个值，模块内部的变化就影响不到这个值
```js
// a.js
var b = require('./b');
console.log(b.foo);
setTimeout(() => {
  console.log(b.foo);
  console.log(require('./b').foo);
}, 1000);

// b.js
let foo = 1;
setTimeout(() => {
  foo = 2;
}, 500);
module.exports = {
  foo: foo,
};
// 执行：node a.js
// 执行结果：
// 1
// 1
// 1
```

如果想要在CommonJS中动态获取值，可以借助函数调用返回相应的值
```js
// a.js
var b = require('./b');
console.log(b.foo());
setTimeout(() => {
  console.log(b.foo());
  console.log(require('./b').foo());
}, 1000);

// b.js
let foo = 1;
setTimeout(() => {
  foo = 2;
}, 500);
module.exports = {
  foo: () => {
    return foo;
  },
};
// 执行：node a.js
// 执行结果：
// 1
// 2
// 2
```

Browserify
```shell
npm install browserify -g
npm install browserify -D
```

### AMD
requirejs
专门用于浏览器端，模块的加载是异步的
```js
define(['module1', ], function(module1) {})

(function() {
    requirejs.config({
        // baseUrl: '',
        paths: {
            module1: './modules/module1',
            m2: './modules/m2',
            angular: './libs/angular',
        },
        shim: {
            angular: {
                exports: 'angular'
            }
        }
    });

    requirejs(['m2'], function(m2){
        m2.showMsg();
    })
})();
```

### ES6 Module
es6模块则是动态关联模块中的值，import命令会被js引擎静态分析，优先模块内的其他内容执行
import()允许你在运行时动态地引入es6模块，import()提供一个基于promise的api
```js
// a.js
const str = './b';
const flag = true;
if(flag) {
  import('./b').then(({foo}) => {
    console.log(foo);
  })
}
import(str).then(({foo}) => {
  console.log(foo);
})

// b.js
export const foo = 'foo';

// babel-node a.js
// 执行结果
// foo
// foo
```
