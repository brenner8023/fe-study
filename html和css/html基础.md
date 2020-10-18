# html
## 表单
表单是用户和web站点或应用程序之间交互的主要内容之一, 允许用户将数据发送到web站点.

- form: 按照一定的格式定义了表单, 确定表单行为
- novalidate: 在提交表单数据时不使用默认的方式对表单数据进行验证
- fieldset: 在相关表单元素周围设置边框, 对相关表单元素进行分组
- legend: 为fieldset元素定义标题
- autocomplete: 规定输入字段是否启用自动完成功能
- tabindex: 规定当使用tab键导航时的元素顺序
- autofocus: 规定当页面加载时, 对应元素应当自动获得焦点
```html
<form action="/my-handling-form-page" method="post" novalidate>
  <fieldset>
    <legend>登录</legend>
    <div>
    	<p>
      	<input name="userName" placeholder="邮箱/手机号" tabindex="1" required autofocus />  
      </p>
      <p>
        <input type="password" name="password" placeholder="密码" tabindex="2" required />
        <a href>忘记密码?</a>
      </p>
      <p>
        <input name="code" placeholder="验证码" autocomplete="off" tabindex="3" />
        <img src="" alt="验证码" />
      </p>
      <p>
        <button type="submit" tabindex="4">登录</button>
      </p>
      <a href="" target="_blank" rel="">立即注册</a>
    </div>
  </fieldset>
</form>
```

## 浏览器的渲染过程
1. 浏览器请求到html代码之后，在生成DOM的最开始阶段，并行发起css、图片、js的请求。
2. css文件下载完成，开始构建CSSOM
3. CSSOM构建完成后，和DOM一起生成渲染树
4. Layout：计算每个节点在屏幕中的位置
5. paint：
6. composite

生成DOM：
1. 转换：浏览器从磁盘或网络读取HTML的原始字节，并根据文件的指定编码（比如UTF-8）将它们转换成各个字符
2. 令牌化：浏览器将字符串转成`W3C HTML5标准`规定的各种令牌，例如`<html>`、`<body>`，以及其他尖括号内的字符串。每个令牌都具有特殊含义和一组规则。
3. 词法分析：发出的令牌转换成定义其属性和规则的对象
4. DOM构建：最后创建的对象链接在一个树数据结构内

常见的会导致回流的操作：
- 页面首次加载
- 浏览器窗口尺寸变化
- 元素尺寸、位置、内容或字体变化
- 增加删除DOM元素
- 查询或调用某些特定属性方法

因为频繁修改 DOM 或 CSSOM 本身是件特别耗费性能的事情，现代浏览器大多对于都做了一定的优化。比如会把一系列的操作放进队列机制来批量更新布局，至少一个浏览器刷新帧 16ms（即大多数显示屏幕的刷新率为 60Hz,一个刷新间隔为 1000ms/60）才会清空队列（节流优化~）。但在获取布局尺寸等信息的时候，为了保证数据的准确性，队列中无论有没有会影响这些属性或方法返回值的操作，浏览器也会强制清空队列，触发回流与重绘。
```js
offsetTop、offsetLeft、offsetWidth、offsetHeight

scrollTop、scrollLeft、scrollWidth、scrollHeight

clientTop、clientLeft、clientWidth、clientHeight

width、height

getComputedStyle

getBoundingClientRect
```

## html5
FileReader：
FileReader对象允许Web应用程序异步读取存储在用户计算机上的文件的内容，使用File或Blob对象指定要读取的文件或数据。其中`File`对象可以是来自用户在一个`<input>`元素上选择文件后返回的`FileList`对象,也可以来自拖放操作生成的 `DataTransfer`对象,还可以是来自在一个`HTMLCanvasElement`上执行`mozGetAsFile()`方法后返回结果。

##