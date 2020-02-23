## dom
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

页面元素位置与宽高：
window对象表示一个包含DOM文档的窗口, 其document属性指向窗口中的DOM文档
- 网页上的每个元素都有clientHeight和clientWidth属性. 这两个属性指元素的内容部分再加上padding所占据的视觉面积
- 网页上的每个元素还有scrollHeight和scrollWidth属性, 指包含滚动条在内的该元素的面积, 滚动条滚过的所有长度和宽度
- offsetTop和offsetLeft表示该元素的左上角与父容器左上角的距离
- getBoundingClientRect().top, getBoundingClientRect().left

视口宽高(浏览器窗口宽高)
- window.outerHeight: 浏览器窗口整个高度
- window.innerHeight: window.outerHeight - window.innerHeight = 工具栏高度
- document.documentElement.clientHeight: 不包括滚动条, 包括html元素的border
- document.body.clientHeight: 不包括body的border和滚动条

## dom操作常用方法
获取节点
- document.getElementsByTagName('ul')
- document.getElementById('haha') 或者 document.haha
- document.getElementsByClassName('my-class')
- document.querySelector()
- document.querySelectorAll

获取/设置属性
- elem.getAttribute('width')
- elem.setAttribute('width', '100px')
- elem.removeAttribute()
- elem.hasAttribute()

创建节点
- document.createElement('script')
- document.createTextNode('hello, world')
- document.createAttribute('class')

增加/删除节点
- elem.appendChild(newNode)
- elem.insertBefore(newNode, currNode)
- elem.removeChild(currNode)

获取父节点/子节点/兄弟节点
- elem.parentNode
- elem.children
- elem.childNodes
- elem.firstChild
- elem.lastChild
- elem.nextSibling
- elem.previousSibling

获取当前元素的文本
- elem.innerHTML
- elem.innerText
- elem.outerHTML 只能读取, 不能修改

操作css
- elem.classList.add()
- elem.classList.remove()
- elem.classList.toggle()
- elem.style.cssText += newCss