# 谈谈JavaScript中的this和箭头函数, 手动实现bind, call方法
## 绑定规则
this是在运行时绑定的, 而不是在编写时绑定. this的绑定和函数声明的位置没有关系, this只取决于函数的调用位置. 调用位置就是函数在代码中被调用的位置, 而不是声明的位置. 
```js
function test() { console.log(this); };
test(); // this绑定到全局对象

function test2() { 
    'use strict';

    console.log(this); 
};
test(); // this绑定到undefined

function test3() {
    console.log(this);
}
var obj = { a: 12, foo: test3 };
var foo2 = obj.foo;
foo2(); // this绑定到全局对象
```
显式绑定
- call
- apply
- bind
- API方法, 比如forEach, map
- new绑定

使用new来调用函数, 会自动执行下面的操作
1. 创建一个全新的对象
2. 这个新对象会被执行[[原型]]连接
3. 这个新对象会绑定到函数调用的this, 
4. 如果函数没有返回值, 那么new会自动返回该新对象

如果硬绑定函数被new调用, new会创建一个新的this替换掉硬绑定函数的this
```js
function foo() {
  console.log(this.name);
}

var obj = {name: 'bind'};

var foo2 = foo.bind(obj);

var xs = new foo2();

foo2();
```

## 箭头函数
箭头函数没有this, 不能通过call, apply, bind方法修改this的指向, 可以通过修改上级函数作用域的this来修改

## 手动实现bind
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