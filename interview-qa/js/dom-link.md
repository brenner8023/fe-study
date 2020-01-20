# 获取页面上所有的链接元素
获取页面上所有的a元素
```js
document.getElementsByTagName('a')

document.querySelectorAll('a')
```

获取页面上的所有链接元素
```js
document.links

document.querySelectorAll(':link')
```

链接元素与a元素的区别:
- 没有href属性的a元素不是链接元素
- 链接元素还包括带href属性的area元素

遍历获取的所有链接元素, 如果当前链接元素的href属性值对应的url地址和当前网页地址栏中的host地址不一样, 设置当前链接元素的target属性值是'_blank', 同时设置rel属性值包含'external', 'nofollow', 'noopener'
```js
var links = document.links;

[].slice.call(links).forEach((item, index) => {
    if(item.host !== location.host) {
        item.target = '_blank';
        item.relList.add('external', 'nofollow', 'noopener');
    }
});
```