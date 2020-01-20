#　讲解一下JavaScript中的原型和原型链

JavaScript对象从它的原型那里继承属性
一个对象的原型就是它的构造函数的prototype属性值
每个函数都有一个prototype属性指向原型, 每个对象都有一个constructor属性指向它对应的构造函数
如果isPrototypeOf方法所属的对象是参数的原型对象, 那么该方法返回true
属性继承只会在读取属性的时候发生, 在写入属性值的时候不会发生. 写入属性值所发生的只是直接在对象中创建了一个新属性

## 访问操纵原型
Object.create()根据指定的原型创建新对象, 原型可以是null

Object.getPrototypeOf()获得一个对象的原型

Object.setPrototypeOf()设置一个对象的原型

```js
let o = {};
Object.prototype.isPrototypeOf(o)

Object.prototype.__proto__ === null
```