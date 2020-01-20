# 解释一下浏览器缓存机制, 如何清理缓存?
简单地说, 浏览器缓存就是把一个已经请求过的web资源(html, 图片, js等)拷贝一份副本存储在浏览器中. 缓存会根据缓存机制决定是直接使用副本响应访问请求, 还是向服务器再次发送请求.

```shell
accept-ranges: bytes
age: 52073804
cache-control: max-age=315360000
content-encoding: gzip
content-length: 2203
content-type: text/css
date: Wed, 24 Jul 2019 07:27:31 GMT
etag: "352b-540b1498e39c0"
expires: Fri, 26 Nov 2027 14:30:47 GMT
last-modified: Mon, 07 Nov 2016 07:51:11 GMT
ohc-cache-hit: dgctcache130 [4]
ohc-response-time: 1 0 0 0 0 0
server: JSP3/2.0.14
status: 200
vary: Accept-Encoding,User-Agent
```

## 为什么要使用缓存
1. 减少网络带宽消耗: 当缓存副本被使用时, 产生的网络流量减少, 可以降低运营成本
2. 降低服务器压力: 用户可以重复的使用本地缓存, 减少对服务器的请求
3. 减少网络延迟, 加快页面打开速度, 用户体验更加友好

## 强制缓存和协商缓存
强制缓存: 用户发送的请求, 直接从客户端缓存中读取, 不发送请求到服务器, 不与服务器发生交互行为

协商缓存: 用户发送的请求, 发送到服务器后, 由服务器判断是否从缓存中读取资源

### 强制缓存
使用html meta标签: 告诉浏览器当前页面不被缓存, 每次访问都需要从服务器拉取
```html
<meta http-equiv="Pragma" content="no-cache" />
```

使用缓存有关的http消息报头
Pragma
- no-cache
- 响应
- 告诉浏览器忽略资源的缓存版本, 每次访问都要从服务器拉取
- 在http1.1已被弃用

Expires
- Mon, 15 Aug 2016 03:56:47 GMT
- 响应
- 启用缓存和定义缓存时间. 告诉浏览器资源缓存过期时间, 如果还没过期就不发请求
- 该字段定义的时间是相对于服务器时间, 客户端的时间与服务器的时间可能不一致, 从http1.1开始被替代掉了

Cache-Control
```shell
no-cache
绕开了浏览器, 每一次发起请求都不会再去询问浏览器的缓存情况, 需要进行协商缓存, 直接向服务端去确认该资源是否过期.

no-store
绝对禁止缓存, 绕开浏览器和服务器的缓存确认, 只允许你直接向服务器发送请求, 并下载完整的响应

max-age=3600
指明缓存副本的有效时长, 从请求时间开始到过期时间的秒数

s-maxage
s-maxage优先级高于max-age, 如果s-maxage未过期, 则向代理服务器请求缓存内容

public
资源可以被代理服务器缓存

private
资源只能被浏览器缓存
```

### 协商缓存
协商缓存依赖于浏览器与服务器之间的通信

Last-Modified
- Mon, 15 Aug 2016 03:56:47 GMT
- 响应
- 服务器将资源传递给客户端时, 会将资源最后的更改时间加在实体首部上一起返回给客户端

If-Modified-Since
- Mon, 15 Aug 2016 03:56:47 GMT
- 请求
- 其值为上次响应头的Last-Modified值, 向web服务器请求时带上头If-Modified-Since. web服务器收到请求后, 与被请求资源的最后修改时间进行比较, 若最后修改时间较新, 说明资源又被改动过, 则响应内容, 包括更新Last-Modified值, HTTP 200. 若资源无需更改, 则响应HTTP 304

弊端:
1. 我们编辑了文件, 但是文件的内容没有改变. 服务器并不知道我们是否更改了文件
2. 当我们修改文件的速度过快时, 由于If-Modified-Since只能检查以秒为最小单位, 所以它是感知不到这个改动的

Etag: 是由服务器为每个资源生成的唯一标识字符串, 这个标识字符串是基于文件内容的. Etag和Last-Modified类似

## 如何清理浏览器缓存
F5刷新
Ctrl + F5刷新