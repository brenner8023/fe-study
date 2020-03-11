# Vue Router
Vue Router是vue官方的路由管理器，包含的功能有：
- 嵌套的路由表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于vue.js过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的css class的链接
- html5 history模式或者hash模式
- 自定义的滚动条行为
## 基本知识
使用`router-link`来导航，通过传入`to`属性指定链接，当`router-link`对应的路由匹配成功时，将自动设置class属性值为`.router-link-active`。
路由匹配到的组件将渲染在`router-view`里

定义路由
```js
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: "/a", component: A, alias: "/b" }, // 取别名
  { path: "*", redirect: "/foo" } // 重定向
]
```
创建router实例
```js
const router = new VueRouter({
  routes
});

// 记得在根实例通过router配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount("#app");
```
通过注入路由器，我们可以在任何组件内通过`this.$router`访问路由器，也可以通过`this.$route`访问当前路由。

## 动态路由匹配
动态路径参数
```js
// 像/user/foo和/user/bar都将映射到相同的路由，匹配到的参数值会被设置到this.$route.params，例如this.params.id即可获取用户id
const router = new VueRouter({
  routes: [
    { path: "/user/:id", component: User }
  ]
});
```
当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

通配符
```js
path: "*" // 会匹配所有路径
path: "/user-*" // 会匹配所有以/user-开头的路径
```
当使用通配符时，`this.$route.params`会自动添加一个名为pathMatch参数，它包含了url通过通配符被匹配到的部分
## 嵌套路由
`router-view`渲染最高级路由匹配到的组件，同样一个被渲染组件也可以包含自己的`router-view`，要在嵌套的路由中渲染组件，需要增加children参数进行配置
```js
const router = new VueRouter({
  routes: [
    {
      path: "/user",
      component: User,
      children: [
        {
          // /user/profile匹配成功
          path: "profile",
          component: UserProfile
        },
        {
          // /user/posts匹配成功
          path: "posts",
          component: UserPosts
        },
        {
          // 空的子路由
          path: "",
          component: UserHome
        }
      ]
    }
  ]
});
```
## 操作History
`router.push`、 `router.replace` 和 `router.go` 跟 `window.history.pushState`、 `window.history.replaceState` 和 `window.history.go`好像， 实际上它们确实是效仿 `window.history` API 的。

Vue Router 的导航方法 (push、 replace、 go) 在各类路由模式 (history、 hash 和 abstract) 下表现一致。
```js
const userId = "123";
this.$router.push({ name: "user", params: { userId } });
this.$router.push({ path: `/user/${userId}` });
```
## 命名
通过一个名称来标识一个路由
```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
});

<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

router.push({ name: 'user', params: { userId: 123 }})
```
命名视图：对于同个路由，多个视图需要多个组件
```js
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```
[路由组件传参](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%87%BD%E6%95%B0%E6%A8%A1%E5%BC%8F)
- 布尔模式
- 对象模式
- 函数模式

## 导航守卫
全局守卫
1. `router.beforeEach`全局前置守卫，进入路由之前
2. `router.beforeResolve`全局解析守卫，在`beforeRouteEnter`调用之后调用
3. `router.affterEach`全局后置钩子，进入路由之后
```js
const router = new VueRouter({});

router.beforeEach((to, from, next) => { 
  next();
});
router.beforeResolve((to, from, next) => {
  next();
});
router.afterEach((to, from) => {
  console.log('afterEach 全局后置钩子');
});
```
to、from表示将要进入和离开的路由对象(`this.$route`)
next：
- `next()`进入该路由
- `next(false)`取消进入该路由，地址重置为from的路由地址
- `next("/user/foo")`或者`next({path:"/user/foo"})`跳转新路由

路由独享守卫：为某些路由单独配置守卫
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => { 
        // 参数用法什么的都一样,调用顺序在全局前置守卫后面，所以不会被全局守卫覆盖
        // ...
      }
    }
  ]
})
```
路由组件内的守卫：
- `beforeRouteEnter`：进入路由之前
- `beforeRouteUpdate`：当前路由改变，但是该组件被复用
- `beforeRouteLeave`：离开当前路由时

完整的导航解析流程：
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数
