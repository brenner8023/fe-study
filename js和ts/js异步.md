# js异步
## setTimeout / setInterval
使用setTimeout实现setInterval：
```js
function mySetInterval(...args) {
  mySetInterval.timer = setTimeout(() => {
    args[0]();
    mySetInterval(...args);
  }, args[1]);
}

mySetInterval.clear = () => {
  clearTimeout(mySetInterval.timer);
};
```
测试
```js
mySetInterval(() => {
  console.log("执行了");
}, 1000);

setTimeout(() => {
  mySetInterval.clear();
  console.log("已取消定时器");
}, 6300);
```

## 浏览器的事件循环机制
js的特点：
- 单线程：js代码在执行的时候，只有一个主线程来处理所有的任务。
- 非阻塞：当代码需要进行一项异步任务（无法立刻返回结果，需要花一定时间才能返回的任务，如I/O事件）的时候，主线程会挂起（pending）这个任务，然后在异步任务返回结果的时候再根据一定规则去执行相应的回调。

执行上下文和执行栈：
- 
- 而当一系列方法被依次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队在一个单独的地方。这个地方被称为执行栈。

任务队列：
js引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。

macro task和micro task：
在一个事件循环中，异步事件返回结果后会被放到一个任务队列中。然而，根据这个异步事件的类型，这个事件实际上会被归到对应的宏任务队列或者微任务队列中去。并且在当前执行栈为空的时候，主线程会 查看微任务队列是否有事件存在。如果不存在，那么再去宏任务队列中取出一个事件并把对应的回到加入当前执行栈；如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈...如此反复，进入循环。

## Promise
三种状态：pending/resloved/rejected

3种方式改变promise的状态：
1. resolve
2. reject
3. 抛出异常

then方法第二个参数和catch方法的区别是then方法第二个参数无法捕获到then方法第一个参数的错误

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

串行执行promise
```js
async function test(arr) {
	for (let i = 0; i < arr.length; i++) {
		let p = await arr[i];
	}
}
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