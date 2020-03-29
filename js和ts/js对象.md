# js对象
## 对象属性描述符：
- value: 就是属性的值
- writable: 决定属性能否被赋值
- enumerable: 决定for in能否枚举到该属性
- configurable: 属性不可配置时, 不可以使用defineProperty方法修改, 禁止删除这个属性
- getter: 函数或者是undefined, 在取属性值时被调用
- setter: 函数或者undefined, 在设置属性值时被调用

实现不可修改的js对象属性
```js
let obj = {
  _a: 10,
  set a(value) {},
  get a() {
    return 20;
  }
};

obj.a = 300;
console.log(obj.a);

let obj2 = {
  b: 10
};
Object.defineProperty(obj2, "b", {
  writable: false,
  value: 20
});

obj2.b = 300;
console.log(obj2.b);
```

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
冻结一个对象，一个被冻结的对象再也不能被修改
```js
Object.freeze(obj); // 浅冻结

// 深冻结
function deepFreeze (o) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) { // 判断一个对象是否被冻结
      deepFreeze(o[prop]);
    }
  });
  
  return o;
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
浅拷贝：复制一层对象的属性，但不包括对象里面为引用类型的数据，当已拷贝对象的引用类型属性被修改时，原来的对象也会被修改。
```js
let a = {a1: [], a2: {}};
let b = Object.assign({}, a);
b == a
b.a1 == a.a1
```
深拷贝：重新开辟一块内存空间，需要递归拷贝对象里面的引用类型数据。
```js
// 1. 利用JSON进行深拷贝，无法对symbol等类型进行拷贝，无法正确获得原来的值
// 2. 拷贝之后会重置原来对象的constructor
// 3. 如果出现对象循环引用的话会报错
// function、date、undefined、NaN、Infinity、-Infinity、RegExp、Error、null、symbol
let b = JSON.parse(JSON.stringify(a));

function deepCopy(obj, wm=new WeakMap()) {
  let newObj; // 返回拷贝后的新对象

  if (typeof obj != "object" || obj == undefined) {
    newObj = obj;
    return newObj;
  } else {
    // switch(getType(obj)) {
    //   case "date":
    //     return new Date(+obj);
    //   case "regexp":
    //     return new RegExp(obj.source, obj.flags);
    //   case "error":
    //     return obj;
    // }
    if (getType(obj) != "object") return obj; // 视作不可变对象
  }

  newObj = Array.isArray(obj) ? [] : {};

  // 解决循环引用的问题
  if (wm.has(obj)) return wm.get(obj);
  wm.set(obj, newObj);

  // 键名为symbol的情况
  let listOfSymbolKeys = Object.getOwnPropertySymbols(obj);
  if(listOfSymbolKeys.length) {
    listOfSymbolKeys.forEach(item => {
      newObj[item] = deepCopy(obj[item], wm);
    });
  }

  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      newObj[k] = deepCopy(obj[k], wm);
    }
  }
  return newObj;
}
```
深拷贝测试用例
```js
let obj1 = {
  a: new Date(),
  b: null,
  c: undefined,
  d: NaN,
  e: () => { console.log(123); },
  f: Symbol("234"),
  g: /.*/,
  h: new Error("error!!!"),
  i: Infinity,
  j: {
    a: true,
    b: [1,2,3]
  },
  m: {},
  n: {}
};
// 键名为symbol
let sa = Symbol("a");
obj1[sa] = false;
// 循环引用
obj1.m.a1 = obj1.n;
obj1.n.a1 = obj1.m;

// 打印结果
let obj2 = deepCopy(obj1);
console.log(obj2.a, obj1.a, obj2.a == obj1.a);
```

## 原型、继承
new关键字：
1. 创建一个普通js对象
2. 链接该对象到另一个对象
3. 将步骤1的对象作为this的上下文
4. 如果该函数没有返回对象，则返回this

访问操纵原型：
- `Object.create()`根据指定的原型创建新对象, 原型可以是null
- `Object.getPrototypeOf()`获得一个对象的原型
- `Object.setPrototypeOf()`设置一个对象的原型

一个对象的原型就是它的构造函数的prototype属性值，每个构造函数都有一个prototype属性指向原型，每个原型都有一个constructor属性指向它对应的构造函数，对象可以通过`obj.__proto__`访问到其原型

继承的实现：
```js
function Foo (name) {
    this.name = name + "foo";
}
function Bar (name) {
    this.name = name + "bar";
}
Foo.prototype.hello = function () { console.log(this.name); };
Bar.prototype = Object.create(Foo.prototype);
let b = new Bar("b");
```
```js
function Foo (name) {
    this.name = name + "foo";
}
function Bar (name) {
    this.name = name + "bar";
}
Foo.prototype.hello = function () { console.log(this.name); };

Object.setPrototypeOf(Bar.prototype, Foo.prototype);
let b = new Bar("b");
```
