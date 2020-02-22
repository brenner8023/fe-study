# 基础类型
`null`和`undefined`是其它类型的子类型，其他类型可以赋值为`null`和`undefined`
- boolean
- string
- number
- object
- null
- undefined
- symbol
- any
- void：用于表示函数返回值的类型，表示该函数没有返回值
- never：never类型是所有其它类型的子类型，代表从不会出现的值，在函数中，它通常表现为抛出异常或无限循环

数组：
```ts
let arr: number[],
    arr2: Array<number>,
    arr3: (string | number)[];
```
元组类型：`let tuple: [string, number, boolean];`
枚举类型：
```ts
enum Roles {
    SUPER_ADMIN,
    ADMIN,
    USER
};
console.log(Roles.USER);


```

类型断言：
```ts
let getLen = (target: string | number): number => {
    if((<string>target).length || (target as string).length == 0) {
        return (<string>target).length;
    } else {
        return target.toString().length;
    }
}
```

# 接口
```ts
interface UserInfo {
    firstName: string,
    lastName: string,
    age?: number, // 可选属性
    readonly sex: true,
    [prop: string]: any
}

function getFullName({firstName, lastName} : UserInfo): string {
    return `${firstName} ${lastName}`;
}

function getFullName(UserInfo): string {
    return `${firstName} ${lastName}`;
}

interface PersonInfo extends UserInfo {

}
```
# 泛型
```ts
let getArray = <T>(value: T = 0, times: number = 1): T[] => {
    return new Array(times).fill(value);
};
console.log(getArray<number>('a', 4));

let getArray = <T, U>(param1: T, param2: U, times: number): Array<[T,U]> => {
    return new Array(times).fill([param1, param2]);
};

// 接口泛型
interface GetArray<T> {
}
// 泛型继承
interface ValueWithLength {
    length: number
}
let getArray = <T extends ValueWithLength>(arg: T): T => {return };

<T, K extends keyof T>
```
# 类
```ts
class Person {
    _age: 18
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getPos() {
        return [this.x, this.y]; 
    }
    set age(newVal) {
        this._age = newVal;
    }
    get age() {
        return this._age;
    }
    static getClassName() {
        return Person.name;
    }
}

// 继承
class Child extends Parent {
    constructor() {
        super();
    }
}
// super作为函数，表示父类的constructor方法
// super作为对象：在普通方法中表示父类的原型对象，在静态方法中表示父类

// 修饰符
public
private
protected
readonly

abstract class People {
    constructor(name: string) {}
    public abstract printName(): void
}

interface FoodInterface {
    type: string
}
class Food implements FoodInterface {
    type: string
}

const create = <T>(c: new() => T): T => {
    return new c();
}
```
# 类型推论
交叉类型
```ts
let func = <T, U>(arg1: T, arg2: U): T & U => {
    let res: T & U;
    res = Object.assign(arg1, arg2);
    return res;
}
```
类型保护
```ts
function isString(value: number | string): value is string {
    return typeof value === 'string';
}

typeof
instanceof

!非空断言操作符
```
类型别名
```ts
type Add = (x: number, y: number) => number;

type Direction = 'north' | 'east' | 'south' | 'west';
```
# 模块和命名空间
```ts
export interface FuncInterface {
    (arg: number): string
}

export class Person {
    constructor() {}
}

class DD {
    constructor() {}
}
export { DD }

export {Child as ChildNamedCC}

export * from './b';

export = {};
import data = require('');
```
命名空间
```ts
namespace vv {
    let a = 11;
    export let b = 12;
}
```

# 装饰器
```ts
function setProp1(target) {

}
@setProp1

function setProp2() {
    return function(target) {

    }
}
@setProp2()

// 类装饰器
// 方法装饰器
```
# 声明文件
# tsconfig.json
```json
{
    "files": [],
    "include": [],
    "exclude": [],
    "extends": "",
    "compilerOptions": {
        "target": "es5",
        "lib": [
            "es2015",
            "dom"
        ],
        "allowJS": true
    }
}
```
