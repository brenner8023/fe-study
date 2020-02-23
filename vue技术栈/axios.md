# axios
```js
axios.get("/user", {
  params: {
    id: 12345
  }
})
  .then(res => {})
  .catch(err => {})
```

请求配置：
- method：请求方法
- baseURL：将自动加在url前面
- timeout
- headers：自定义请求头
- url
- transformResponse：在传递给then/catch方法之前允许修改响应的数据
```js
transformResponse: [
  data => { return data; }
]

headers: {'X-Requested-With': 'XMLHttpRequest'}

// 设置全局的默认值
axios.defaults.baseURL = "";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
```

响应的结构：
```js
{
  data: {}, // 服务器提供的响应
  status: 200, // http状态码
  statusText: "OK", // http状态信息
  headers: {}, // 响应头
  config: {}, // 为请求提供的配置信息
}
```

拦截器：
```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

```