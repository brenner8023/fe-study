# JavaScript基础
## 闭包
JavaScript函数内部可以直接读取函数外部的变量，但是在函数外部无法直接读取到函数内的局部变量。
可以通过间接的方法实现，那就是在函数的内部在定义一个函数。
优势：向外暴露函数内部变量，变量始终保存在内存空间中
劣势：函数作用域内所产生的内存占用没有释放
```js
function f1() {
  let n = 123;
  return function () {
    n++;
    console.log(n);
  }
}
```
## 数据类型
JavaScript中有8种数据类型, 包括基本数据类型(number, string, boolean, null, undefined, symbol, bigint)和引用数据类型object

NaN表示not a number(非数字), NaN和任何值都不相等, 包括它自己. 所以x != x当且仅当x是NaN时成立. 0/0会返回NaN
- Number.isNaN(Number.NaN)
- x != x 可以用来检测x是否是NaN
- Number.isFinite()可以用来检测Number.NaN和Infinity.

bigint：
- bigint可以使用任意精度表示整数. 即使超出js的安全数, 也可以安全地存储和使用大整数
- bigint不能表示小数
- BigInt(123)

string：
- js中的字符串是不可变的, str.length可表示字符串的长度
- 基本数据类型字符串它不是对象, 却能够使用对象才有的属性和方法进行操作(比如str.length, str.split('-')), 这是因为三个关键的基本数据类型都有自己对应的对象(Number, String和Boolean). 这三个对象是针对数字, 字符串和布尔值的包装.
- 当我们在对象环境中使用字符串时(比如使用str.length), JavaScript会为这个字符串内部地创建一个String对象, 这个对象就代替了原始的字符串值来执行相应的操作. 注意此时被创建的String对象只是瞬时存在的, 使用之后系统就会自动将其丢弃.

symbol：
es5的对象属性名都是字符串, 这样子很容易造成属性名冲突. 比如使用了一个他人提供的对象, 想为这个对象添加新的方法, 新方法的名字就可能与现有方法发生冲突. es6引入了symbol类型, 代表独一无二的值, 这样可以保证每个属性都是独一无二的.
```js
// symbol值通过Symbol()函数生成
let firstName = Symbol('first name');
let person = {};
person[firstName] = 'chen';

let s1 = Symbol('s1'); // 参数表示对symbol值的描述
let s2 = Symbol('s1'); // s1 == s2会返回false
// symbol的描述被存储在内部属性中, 不能直接在代码里访问, 只有当调用symbol的toString方法时才可以读取到这个属性

// 创建一个可以共享的symbol
// Symbol.for方法首先会在全局Symbol注册表中搜索键为aa的symbol是否存在, 如果存在直接返回已有的symbol, 否则就新建一个.
let a1 = Symbol.for('aa');
let a2 = Symbol.for('aa'); // a1 === a2会返回true
Symbol.keyFor(a1); // 返回aa

Symbol.prototype.hello = () => console.log('hello');
var a = Symbol('a');
a.hello();
```

注意点:
- 用symbol作为对象的属性名时, 不能通过点去访问属性, 通过点访问, js会将属性名解析成字符串
- JSON无法存储Symbol类型的值
- 不可枚举: 当Symbol值作为对象属性名时, 可以保证对象不会出现重复的属性, `for in`、`Object.keys()`、`Object.getOwnPropertyNames()`等方式无法枚举Symbol值出来, 可以调用`Object.getOwnPropertySymbols()`获取Symbol值. 借助Symbol的不可枚举特性可以在js中模拟私有变量

```js
let obj = {
    [Symbol.hasInstance] (otherObj) {
        console.log(otherObj);
    }
}
console.log({a: 123} instanceof obj);

let arr = [1, 2, 3];
console.log([].concat(arr, [4, 5]));
arr[Symbol.isConcatSpreadable] = false;
console.log([].concat(arr, [4, 5]));

Symbol.match
Symbol.replace
Symbol.search
Symbol.split
Symbol.iterator
Symbol.toPrimitive
Symbol.toStringTag
Symbol.unscopables
```

## 数据类型判断
1. typeof
2. instanceof
3. constructor
4. Object.prototype.toString.call

typeof
- 对于非object的基本类型, 除null以外, 均可返回意料之中的结果
- 对于引用类型, 除function以外, 一律返回object
- 对于null, 返回object
- 对于function, 返回function
- typeof(typeof a)返回的是string

因为typeof NaN会返回number, 但是NaN不能用于数值计算, 所以在使用typeof判断数字时, 建议这样子做: `typeof num == 'number' && Number.isFinite(num)`

instanceof:
A instanceof B是用来判断B的原型是否在A的原型链上
instanceof的问题在于它假定只有一个全局执行环境, 如果存在两个及以上的全局执行环境, 那么就存在不同的构造函数, 此时instanceof无法进行判断

Object.prototype.toString.call(true) === '[object Boolean]'

constructor：
当声明定义一个构造函数时, js会为构造函数添加一个prototype属性指向构造函数的原型对象, 这个原型对象会有一个constructor属性指向构造函数. 而当使用new和构造函数创建一个实例对象时, 实例对象会继承原型对象的constructor属性
```js
let a = [], b = 100;
a.constructor == Array
b.constructor == Number
```
注意：当程序员重写prototype指向之后, 原来的constructor就会丢失。

```js
function getType(data) {
    if(data === null) return 'Type: null';
    else if(data === undefined) return 'Type: undefined';
    else if(typeof data == 'number' && Number.isFinite(data)) return 'Type: number';
    else if(typeof data == 'string') return 'Type: string';
    else if(typeof data == 'boolean') return 'Type: boolean';
    else if(typeof data == 'function') return 'Type: function';
    else {
        let tmp = Object.prototype.toString.call(data);
        return 'Type:' + tmp.slice(7, tmp.length-1).toLowerCase();
    }
}
```

## var/let/const
- let、var定义的变量如果没有初始化, 那么它的初始值默认是undefined
- const定义的变量是一个常量, 必须初始化, 而且初始化之后不能修改绑定, 但允许修改值, 这就意味着用const声明一个对象后, 可以修改该对象的属性值
- 使用var关键字多次声明同一个变量是合法的, 但是使用let/const多次声明同一个变量是不合法的, let/const禁止重复声明
- var声明的变量的作用域有全局作用域和函数作用域, 没有块级作用域. let/const声明的变量增加了块级作用域

从 ES3 开始，try/catch 结构在 catch 分句中具有块作用域. 因此在es6之前的环境里可以利用catch实现块级作用域
```js
try {
    throw undefined;
} catch(a) {
    a = 2;
    console.log(a);
}
console.log(a);
```

暂时性死区：只要作用域内存在let/const关键字声明的变量, JavaScript会将该变量声明移入暂时性死区中, 访问暂时性死区中的变量会触发运行时错误, 只有在执行过let/const变量声明语句之后, 该变量声明才会从暂时性死区中移除, 之后可以正常访问.
```js
var tmp = 10;
if(true) {
    tmp = 20; // 试图访问暂时性死区中的变量, 报错
    let tmp;
}

function fn(x=y, y=2) {
    return [x, y];
}
fn(); // 报错
```

var存在声明提升
```js
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

## js数组
实现类数组
```js
function ArrayLike() {
    return {
        length: 0,
        push: function(value) {
            this[this.length] = value;
            this.length++;
        }
    };
}
```
类数组转化为数组：
1. `[].slice.call(obj)`
2. `Array.from(obj)`
3. `[...obj]`

实现map方法
```js
Array.prototype.mapPolyfill = function(...args) {
  const arr = this; // 存储数组
  let result = []; // 最终的返回值
  let fn = args[0]; // 回调函数
  let cbThis = null;

  // 异常处理
  if(args.length === 0) throw new TypeError('undefined is not a function');
  if(typeof args[0] !== 'function') throw new TypeError(`${args[0]} is not a function`);

  cbThis = args[1] === undefined ? null : args[1];

  for(let i = 0; i < arr.length; i++) {
    result.push(fn.call(cbThis, arr[i], i, arr));
  }

  return result;
}
```
实现reduce方法
```js
Array.prototype.reducePolyfill = function(...args) {
  const arr = this; // 存储数组
  let initialValue = 0; // 设置最开始归并的初始值
  let prev = 0; // 每次归并后的返回值, 归并前的第一个值
  let fn = args[0]; // 回调函数

  // 异常处理
  if(args.length === 0)throw new TypeError('undefined is not a function');
  if(typeof args[0] !== 'function')throw new TypeError(`${args[0]} is not a function`);
  if(arr.length === 0 && args.length === 1)throw new TypeError('Reduce of empty array with no initial value');

  initialValue = args[1] === undefined ? 0 : args[1];
  prev = fn(initialValue, arr[0], 0, arr);
  
  for(let i = 1; i < arr.length; i++) {
    prev = fn(prev, arr[i], i, arr);
  }

  return prev;
}
```

## js函数
显示绑定this：
- call
- apply
- bind
- new

如果硬绑定函数被new调用, new会创建一个新的this替换掉硬绑定函数的this

使用new来调用函数, 会自动执行下面的操作：
1. 创建一个全新的对象
2. 这个新对象会被执行[[原型]]连接
3. 这个新对象会绑定到函数调用的this, 
4. 如果函数没有返回值, 那么new会自动返回该新对象

手动实现bind：
```js
if(!Function.prototype.bind) {
    Function.prototype.bind = function(newThis) {
        // 异常处理
        if(typeof this !== 'function') {
            throw new TypeError('出错');
        }

        var args = Array.prototype.slice.call(arguments, 1);
        var oldThis = this;
        var fn = function() {};
        var result = function() {
            var oThis = this instanceof fn && newThis ? oldThis : newThis;
            return oldThis.apply(oThis, args.concat(Array.prototype.slice.call(arguments)));
        };

        fn.prototype = this.prototype;
        result.prototype = new fn();

        return result;
    }
}
```
