# 谈谈JavaScript的对象, 如何判断对象的属性是否存在?

## Object的方法
实现一个不可变的对象
```js
function fn(obj) {
    Object.preventExtensions(obj); // 禁止对象扩展新属性
    Object.keys(obj).forEach(item => {
        Object.defineProperty(obj, item, {
            writable: false,
            configurable: false
        });
    });

    return obj;
}
```
Object.keys(obj)返回obj所有可枚举属性, Object.getOwnPropertyNames(obj)返回对象所有属性, 无论它们是否可以枚举

## 对象属性描述符
- value: 就是属性的值
- writable: 决定属性能否被赋值
- enumerable: 决定for in能否枚举到该属性
- configurable: 属性不可配置时, 不可以使用defineProperty方法修改, 禁止删除这个属性
- getter: 函数或者是undefined, 在取属性值时被调用
- setter: 函数或者undefined, 在设置属性值时被调用

```js
var obj = {};
obj.a = 12;

Object.getOwnPropertyDescriptor(obj, 'a'); // 查看属性

Object.defineProperty(obj, 'a', {writable: false}); // 修改属性

var o = {get a() {return 1;}};
o.a; // 因为get关键字, o.a每次都会返回1
```
## 浅复制和深复制
浅复制
```js
var obj1 = {a: 12, b: 'bb'};
var obj2 = Object.assign({}, obj1);
obj2 == obj1 // 返回false
obj2.a == obj1.a // 返回true
```
深复制
```js
JSON.parse(JSON.stringify(obj))
```

## 判断对象的属性是否存在, 判断是否为空对象
### 判断属性
使用点或者方括号
```js
obj.x === undefined
obj[x] === undefined
```
使用这个方法, 如果对象自身和其原型链上都不存在该属性的话, 会返回undefined, 注意如果对象的原型链上有该属性, 则会返回该属性. 这个方法的局限性在于不能用在对象的属性存在并且属性值为undefined

使用in关键字
```js
'x' in obj
```
如果指定的属性存在指定的对象或其原型链中, 则返回true

使用hasOwnProperty(), getOwnPropertySymbols()
```js
obj.hasOwnProperty('x')
```
只有对象自身存在该属性时, 才会返回true

Object.keys()
```js
let obj = {
  a: 12,
  b: 22,
  c: 456
};

Object.keys(obj).indexOf('d') === -1
```
### 判断空对象
使用for in循环遍历
```js
function test(obj) {
    for(var i in obj) return true;
    return false;
}
```
JSON.stringify
```js
JSON.stringify(obj) === '{}'
```
Object.keys
```js
Object.keys(obj).length === 0
```