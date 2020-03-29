# 面试题
## 技术栈
vue性能优化：
实现无需响应式的数据属性
```js
Object.freeze(obj);
data() {
  return {
    obj
  }
}

created() {
  this.foo = {

  };
}
```

Vue组件通信

## js
如何判断一个空对象，如何判断对象的属性是否存在

## 项目
git开发流程、变基rebase的应用场景