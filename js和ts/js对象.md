# js对象
对象属性描述符：
- value: 就是属性的值
- writable: 决定属性能否被赋值
- enumerable: 决定for in能否枚举到该属性
- configurable: 属性不可配置时, 不可以使用defineProperty方法修改, 禁止删除这个属性
- getter: 函数或者是undefined, 在取属性值时被调用
- setter: 函数或者undefined, 在设置属性值时被调用

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
判断是否为空对象：
1. `for in`
2. `Object.keys`
3. `JSON.stringify`
```js
function (obj) {
  for (let k in obj) return true;
  return false;
}

Object.keys(obj).length == 0

JSON.stringify(obj) == "{}"
```
判断对象的属性是否存在：
```js
obj.xx == undefined
obj.xx && obj.xx == 111

if(xx in obj)

obj.hasOwnProperty("xx")

Object.keys(obj).indexOf("xx") !== -1
```

## 深拷贝和浅拷贝
浅拷贝
```js
let a = {a1: [], a2: {}};
let b = Object.assign({}, a);
b == a
b.a1 == a.a1
```
深拷贝
```js
let b = JSON.parse(JSON.stringify(a));
```

## 继承
访问操纵原型：
- `Object.create()`根据指定的原型创建新对象, 原型可以是null
- `Object.getPrototypeOf()`获得一个对象的原型
- `Object.setPrototypeOf()`设置一个对象的原型

一个对象的原型就是它的构造函数的prototype属性值，每个构造函数都有一个prototype属性指向原型，每个原型都有一个constructor属性指向它对应的构造函数，对象可以通过`obj.__proto__`访问到其原型
