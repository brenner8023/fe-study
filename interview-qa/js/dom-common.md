# dom操作知识点
## 在ul标签中插入1000个li标签, 点击li标签显示对应序号
```js
var ul = document.getElementsByTagName('ul')[0];
var liArr = document.getElementsByTagName('li');
var str = '';

for(var i = 0; i < 1000; i++) {
  str += '<li>这是一个li标签</li>';
}

ul.innerHTML = str;

ul.addEventListener('click', (e) => {
  for(var i = 0; i < liArr.length; i++) {
    if(liArr[i] === e.target) alert(i+1);
  }
});
```

## 获取页面元素位置与宽高
window对象表示一个包含DOM文档的窗口, 其document属性指向窗口中的DOM文档

- 网页上的每个元素都有clientHeight和clientWidth属性. 这两个属性指元素的内容部分再加上padding所占据的视觉面积
- 网页上的每个元素还有scrollHeight和scrollWidth属性, 指包含滚动条在内的该元素的面积, 滚动条滚过的所有长度和宽度
- offsetTop和offsetLeft表示该元素的左上角与父容器左上角的距离
- getBoundingClientRect().top, getBoundingClientRect().left

视口宽高(浏览器窗口宽高)
- window.outerHeight: 浏览器窗口整个高度
- window.innerHeight: window.outerHeight - window.innerHeight = 工具栏高度
- document.documentElement.clientHeight: 不包括滚动条, 包括html元素的边框
- document.body.clientHeight: 不包括body的边框和滚动条

## dom操作的常用方法和属性
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