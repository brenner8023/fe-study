# ajax详解和跨域请求
ajax即asynchronous javascript and xml. 在不重新加载整个网页的情况下, 通过XMLHttpRequest对象来向服务器发出异步请求, 从服务器按需获取数据, 然后用JavaScript来操作DOM而更新页面.

## XMLHttpRequest
主要方法
```c
void open(String method, String url, Boolean async)
用于创建请求, 形参: 请求方法, 请求地址, 是否异步

void send(String body)
用于发送请求, 形参: 要发送的数据

void setRequestHeader(String header, String value)
用于设置请求头, 形参: 请求头的key, 请求头的value

String getAllResponseHeaders()
获取所有响应头, 响应头数据

String getReponseHeader(String header)
获取响应头中指定header值

void abort()
终止请求

xhr.upload.onprogress = ()=>{} 根据客户端发送的数据显示进度

xhr.onprogress = ()=>{} 根据服务器返回的数据显示进度

xhr.onload = ()=>{}

xhr.onerror = ()=>{}
```

- onreadystatechange: 每次状态改变所触发的事件
- responseText: 从服务器返回数据的字符串形式
- responseXml: 从服务器返回的DOM兼容的文档数据对象
- status: 从服务器返回的http状态码
- readyState: 对象状态值

readyState:
- 0: 未初始化, 尚未调用open方法
- 1: 启动, 已经调用open方法, 尚未调用send方法
- 2: 发送, 已经调用send方法, 但是还没有接收到响应
- 3: 已接收部分数据
- 4: 数据接收完毕, 此时可以通过responseXml和responseText获取完整的回应数据

get请求: 用于向服务器查询某些信息
```js
function getXHR() {
    var xhr = null;
    if(XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft');
    }
    return xhr;
}

function XmlGetRequest() {
    var xhr = getXHR();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            var data = xhr.reponseText;
            console.log(data);
        }
    };
    xhr.open('get', '/test', true);
    xhr.send();
}
```

## 跨域
同源策略: 请求的链接地址, 必须与浏览器上的url处于同域, 也就是域名, 端口, 协议必须相同. 同源策略是浏览器的限制, 所以请求的发送和响应都是可以进行的, 只是浏览器不接受. 同源策略并不是对所有的请求都有限制, 比如对具有src属性的标签就不起作用.

### JSONP
- ajax直接请求普通文件存在跨域无权限访问的问题
- 我们在调用js文件, 调用图片的时候不受跨域影响, 凡是拥有src这个属性的标签都可以跨域, 比如script, img, iframe标签
- 如果想通过纯web端跨域访问数据, 那就把远程服务器上的数据装进js文件里
- jsonp仅支持get方法

jsonp实现流程
1. 声明一个回调函数, 其函数名当做参数值, 要传递给跨域请求数据的服务器, 函数的形参为服务器返回的data
2. 创建一个script标签, 把那个跨域的API数据接口地址赋值给script的src, 还要在这个地址中向服务器传递该函数名
3. 服务器接收到请求后, 需要进行处理: 把传递进来的函数名和它需要给你的数据拼接成一个字符串, 例如: 传递进去的函数名是show, 它拼接好的数据就是show('xx公司怎么样')
4. 最后服务器把准备的数据通过http协议响应给客户端, 客户端调用回调函数对返回的数据进行操作

自己封装的jsonp函数
```js
function jsonpPolyfill(url, params, callback) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script'); // 创建script标签
        let arr = [];

        params = {...params, callback};

        for(let key in params) {
            arr.push(`${key}=${params[key]}`);
        }

        script.src = `${url}?${arr.join('&')}`;
        document.body.appendChild(script);

        window[callback] = function(data) {
            resolve(data);
            document.body.removeChild('script');
        };

    });
}

jsonpPolyfill({
    url: 'https://www.baidu.com/say',
    params: {wd: 'ii', ks: 'ff'},
    callback: 'show'
}).then((data) => {
    console.log(data);
});
```

## CORS
CORS, 跨域资源共享. 服务端设置响应头Access-Control-Allow-Origin为`http://my.com`或者*, 就可以开启CORS. 该属性表示哪些域名可以访问资源, 如果设置通配符则表示所有网站都可以访问资源. jsonp支持get请求, CORS支持所有的请求. jsonp的优势在于支持比较旧的浏览器

## nginx反向代理

## node中间件代理