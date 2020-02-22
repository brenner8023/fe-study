# js模块

## CommonJS
require命令第一次加载该脚本时就会执行整个脚本，然后在内存中生成一个对象。
```js
{
    id: '...', // 模块名
    exports: { ... }, // 该模块导出的接口
    loaded: true, // 表示该模块是否加载完毕
    ...
}
```
以后再需要用到这个模块时，就会到exports属性取值，即使再次执行require，也不会执行该模块，而是到缓存中取值。

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

## es6 module