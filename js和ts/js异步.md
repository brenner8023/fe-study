# js异步
## Promise
```js
new Promise((resolve, reject) => {
  console.log("外部promise");
	resolve();
})
	.then(() => {
		console.log("外部第一个then");
		return new Promise((resolve, reject) => {
			console.log("内部promise");
			resolve();
		})
			.then(() => {
				console.log("内部第一个then");
			})
			.then(() => {
				console.log("内部第二个then");
			})
	})
	.then(() => {
		console.log("外部第二个then");
	})
```
```js
new Promise((resolve, reject) => {
  console.log("外部promise");
	resolve();
})
	.then(() => {
		console.log("外部第一个then");
		new Promise((resolve, reject) => {
			console.log("内部promise");
			resolve();
		})
			.then(() => {
				console.log("内部第一个then");
			})
			.then(() => {
				console.log("内部第二个then");
			})
	})
	.then(() => {
		console.log("外部第二个then");
	})
```
```js
new Promise((resolve, reject) => {
  console.log("外部promise");
	resolve();
})
	.then(() => {
		console.log("外部第一个then");
		let p = new Promise((resolve, reject) => {
			console.log("内部promise");
			resolve();
		});
		p.then(() => {
			console.log("内部第一个then");
		});
		p.then(() => {
			console.log("内部第二个then");
		});
	})
	.then(() => {
		console.log("外部第二个then");
	})
```

## XMLHttpRequest
```js
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
五个readyState状态值：
- 0: 未初始化, 尚未调用open方法
- 1: 启动, 已经调用open方法, 尚未调用send方法
- 2: 发送, 已经调用send方法, 但是还没有接收到响应
- 3: 已接收部分数据
- 4: 数据接收完毕, 此时可以通过responseXml和responseText获取完整的回应数据

基本使用：
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

## 跨域和jsonp
同源策略: 请求的链接地址, 必须与浏览器上的url处于同域, 也就是域名, 端口, 协议必须相同. 同源策略是浏览器的限制, 所以请求的发送和响应都是可以进行的, 只是浏览器不接受. 同源策略并不是对所有的请求都有限制, 比如对具有src属性的标签就不起作用.

CORS：
CORS, 跨域资源共享. 服务端设置响应头Access-Control-Allow-Origin为`http://www.baidu.com`或者*, 就可以开启CORS. 该属性表示哪些域名可以访问资源, 如果设置通配符则表示所有网站都可以访问资源. CORS支持所有的请求.

nginx反向代理：
```c
location ^~ /api/ {
  proxy_pass https://www.baidu.com/;
}
```

jsonp函数封装
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
    callback: 'jsonpcb'
}).then((data) => {
    console.log(data);
});
```

设置jsonp支持post