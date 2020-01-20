# 说一说有哪些操作字符串的方法? 讲一讲有哪些操作数组的方法? 并且实现这些API
## 操作字符串的方法有哪些?
字符串是不可变的, 字符串中的所有方法实际上返回的都是一个新的字符串值
字符串的连接
str.concat(str2)

去掉字符串前后的空白
str.trim()

字符串的截取
str.substring(1, 4)
str.substr(1, 4), str.substr(-2)
str.splice(1, 2, 'a', 'b')
str.slice(0), str.slice(0, -1)

字符串转数组
str.split('-')

字符串的替换
str.splice(1, 2, 'a', 'b')
str.toUpperCase(), str.toLowerCase()
```js
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```

字符串的查找
- str.indexOf('a'), str.lastIndexOf('a'), str.indexOf('a', 3)
- str.charAt(2), str[2]
- str.charCodeAt(2)
- String.fromCharCode(65, 66, 67)

## 操作数组的方法有哪些
数组的出栈入栈操作
arr.push(), arr.pop(), arr.unshift(), arr.shift()

数组转字符串 
arr.join('-')

数组元素的排序
arr.reverse()
arr.sort((a, b)=>{return a-b})

数组的连接
arr.concat([3, 4])

数组的截取
arr.slice(0), arr.slice(0, -1), arr.slice(0, 2)
arr.splice(1, 2, 'a', 'b')

数组元素的查找
- arr.indexOf(), arr.lastIndexOf()

数组元素的遍历
- arr.forEach(), arr.map()
- arr.filter(), arr.reduce((prev, cur) => { return (prev+cur); }, 10);
- arr.some(), arr.every(), arr.find()

## 模拟实现API
### 字符串API的实现
trim
```js
String.prototype.trimPolyfill = function() {
    let str = this;
    let pattern = /^\s*|\s*$/g;
    
    return str.replace(pattern, '');
}
```
### 数组API的实现
洗牌算法: 将数组元素随机打乱, 使得所有的元素都不在原来的位置上, 算法是公平的
```js
Array.prototype.shuffle = function() {
    var that = this;
    var idx = 0;

    for(var i = that.length - 1; i >= 0; i--) {
        idx = Math.floor(Math.random() * i);
        [that[i], that[idx]] = [that[idx], that[i]];
    }

    return that;
}
```

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

reduce
```javascript
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

map
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

filter
```js
Array.prototype.filterPolyfill = function(...args) {
  const arr = this; // 存储数组
  let cbThis = null; // 回调函数的this
  let fn = null; // 回调函数
  let result = []; // 最终的返回值
  
  // 异常处理
  if(args.length === 0)throw new TypeError('undefined is not a function');
  if(typeof args[0] !== 'function')throw new TypeError(`${args[0]} is not a function`);
  
  cbThis = args[1] === undefined ? null : args[1];
  fn = args[0];
  
  for(let i = 0; i < arr.length; i++) {
    if(Boolean(fn.call(cbThis, arr[i], i, arr)) === true) result.push(arr[i]);
  }
  
  return result;
}
```

find
```js
Array.prototype.findPolyfill = function(...args) {
  const arr = this; // 存储数组
  let cbThis = null; // 回调函数的this
  let fn = null; // 回调函数
  let result = undefined; // 最终的返回值
  
  // 异常处理
  if(args.length === 0) throw new TypeError('undefined is not a function');
  if(typeof args[0] !== 'function') throw new TypeError(`${args[0]} is not a function`);
  
  cbThis = args[1] === undefined ? null : args[1];
  fn = args[0];
  
  for(let i = 0; i < arr.length; i++) {
    if(Boolean(fn.call(cbThis, arr[i], i, arr)) === true) {
      result = arr[i];
      break;
    }
  }
  
  return result;
}
```