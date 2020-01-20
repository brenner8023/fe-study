# 请你讲一讲JavaScript有哪些数据类型, 数据类型判断有哪些方法?手动实现Symbol
## js的8种数据类型
JavaScript中有8种数据类型, 包括基本数据类型(number, string, boolean, null, undefined, symbol, bigint)和引用数据类型object
### number
JavaScript中的整数和浮点数都会按照浮点数的标准进行存储.
```shell
即64个二进制位, 从最左边开始:
第1位: 符号位, 0表示正数, 1表示负数
第2到第12位: 存储指数部分
第13到第64位: 存储小数部分
``` 
其中, 符号位决定一个数是正数还是负数, 指数部分决定了一个数的大小, 小数部分决定了一个数的精度

**数值精度**
JavaScript提供的有效数字最长为53个二进制位, 这意味着绝对值小于2的53次方的整数都能够精确表示
```shell
JavaScript内部实际的表现形式:
(-1)^符号位 * 1.xxx...xxx * 2^指数

Math.pow(2, 53) === Math.pow(2, 53) + 1
```
0.1 + 0.2 = 0.30000000000000004就是因为精度缺失的原因, 还有人因此做了一个网站: (http://0.30000000000000004.com/)
Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER分别表示js的最大安全数和最小安全数

**数值范围**
指数部分的最大值是2047(2^11 - 1), 分出一半表示负数, 那么JavaScript能够表示的数值范围为2^1024到2^(-1023)
Number.MAX_VALUE和Number.MIN_VALUE代表js可表示的最大数字和最小数字
当一个浮点值大于(小于)js所能表示的最大(最小)值时, 其结果是Infinity(-Infinity), 12/0返回Infinity, -12/0返回-Infinity

**NaN**
NaN表示not a number(非数字), NaN和任何值都不相等, 包括它自己. 所以x != x当且仅当x是NaN时成立. 0/0会返回NaN
- Number.isNaN(Number.NaN)
- x != x 可以用来检测x是否是NaN
- Number.isFinite()可以用来检测Number.NaN和Infinity. 
### bigint
bigint可以使用任意精度表示整数. 即使超出js的安全数, 也可以安全地存储和使用大整数
bigint不能表示小数
BigInt(123)
### string
js中的字符串是不可变的, str.length可表示字符串的长度
基本数据类型字符串它不是对象, 却能够使用对象才有的属性和方法进行操作(比如str.length, str.split('-')), 这是因为三个关键的基本数据类型都有自己对应的对象(Number, String和Boolean). 这三个对象是针对数字, 字符串和布尔值的包装.
当我们在对象环境中使用字符串时(比如使用str.length), JavaScript会为这个字符串内部地创建一个String对象, 这个对象就代替了原始的字符串值来执行相应的操作. 注意此时被创建的String对象只是瞬时存在的, 使用之后系统就会自动将其丢弃.

### boolean
null, undefined, 0, -0, NaN, ''都可以转成false
### null和undefined
null == undefined会返回true, null === undefined会返回false

void 0 返回的是undefined
### symbol
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
- JSON中无法存储Symbol类型的值
- 不可枚举: 当Symbol值作为对象属性名时, 可以保证对象不会出现重复的属性, for in等方式无法枚举Symbol值出来, 可以调用Object.getOwnPropertySymbols()获取Symbol值. 借助Symbol的不可枚举特性可以在js中模拟私有变量
### object
对象是通过调用特殊的构造函数创建的, 常常要使用到的对象有以下:
- function: JavaScript的函数是具有可执行代码的对象, 可以通过调用函数执行某些操作
- array
- class
- Date日期
- RegExp正则表达式
    - 匹配所有中文字符, 匹配邮箱
- Math数学
    - Math.ceil(), Math.floor()
    - Math.round(), Math.random()
- JSON
    - null, NaN, Infinity, -Infinity, 正则对象和undefined都会被转成null
    - JSON.parse(JSON.stringify())
- Error: 程序中发生的语法错误和运行时错误的对象

## 数据类型判断
### typeof
- 对于非object的基本类型, 除null以外, 均可返回意料之中的结果
- 对于引用类型, 除function以外, 一律返回object
- 对于null, 返回object
- 对于function, 返回function
- typeof(typeof a)返回的是string

因为typeof NaN会返回number, 但是NaN不能用于数值计算, 所以在使用typeof判断数字时, 建议这样子做: typeof num == 'number' && Number.isFinite(num)

### instanceof
A instanceof B是用来判断B的原型是否在A的原型链上
instanceof的问题在于它假定只有一个全局执行环境, 如果存在两个及以上的全局执行环境, 那么就存在不同的构造函数, 此时instanceof无法进行判断

### Object.prototype.toString.call
Object.prototype.toString.call(true) === '[object Boolean]'

### constructor
当声明定义一个构造函数时, js会为构造函数添加一个prototype属性指向构造函数的原型对象, 这个原型对象会有一个constructor属性指向构造函数. 而当使用new和构造函数创建一个实例对象时, 实例对象会继承原型对象的constructor属性
```js
let a = [], b = 100;
a.constructor == Array
b.constructor == Number
```
当程序员重写prototype指向之后, 原来的constructor就会丢失

使用JavaScript写一个判断数据类型的函数
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

## 手动实现symbol的部分特性
```js
(function() {
    var root = this;

    var SymbolPolyfill = function(description) {
        // Symbol()函数前不能使用new关键字
        if(this instanceof SymbolPolyfill)throw new TypeError('Symbol is not a constructor');

        var descString = (description === undefined) ? undefined : String(description);

        // 每一个symbol值都是独一无二的
        var symbol = Object.create(null);
        Object.defineProperties(symbol, {
            '__Description__': {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

        return symbol;
    }
});
```