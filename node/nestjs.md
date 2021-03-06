# Nest.js
nestjs是一个用于构建高效、可扩展的Node.js服务端应用框架，基于TypeScript编写，在设计上有很多灵感来自于Angular。

## 主要特性
- 使用TypeScript，类型推断机制、编译期类型检查，为开发和维护提供了很好的支持
- 内置IOC容器，大量使用依赖注入，开发更便捷、更高效
- 轻松编写AOP代码，面向切面编程，轻松实现日志、拦截器、过滤器等功能

## Controller
控制器，负责处理传入的请求并将响应结果返回给客户端。

控制器的目的是接收应用程序的特定请求。其路由机制控制哪个控制器接收哪些请求。通常，每个控制器都有多个路由，不同的路由可以执行不同的操作。