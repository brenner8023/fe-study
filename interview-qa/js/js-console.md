# console调试技巧
```js
console.log('直接在控制台输出参数');

console.info

console.warn

console.error

console.assert(true, '此时没有输出啦');
console.assert(false, '错了'); // 只有当断言条件为false时, 才有输出

// 分组输出
console.group('第一组');
console.log('balabala');
console.log('dilidili');
console.groupEnd(); // 不接受参数, 表示分组的结束
console.group('第二组');
console.log('balabala');
console.log('dilidili');
console.groupEnd();

console.count('num'); // 计数

console.time('time');
// balabala
console.timeEnd('time'); // 计时
```