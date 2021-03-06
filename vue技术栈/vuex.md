# Vuex
简单状态管理：
```js
var store = {
  debug: true,
  state: {
    message: 'Hello!'
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}
```

vuex状态管理：
```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  // 统一状态管理
  state: {
    counter: 0
  },
  getters: {
    tripleCounter: state => state.counter * 3
  },
  // 更改状态
  mutations: {
    increment(state, num) {
      state.counter += num;
    }
  },
  // 异步提交更改
  actions: {
    // asyncNum: {num: 2, time: 1000}
    asyncIncrement({commit}, asyncNum) {
      setTimeout(() => {
        commit("increment", asyncNum.num);
      }, asyncNum.time);
    }
  }
});
```

专门为Vue开发的状态管理模式，采用集中式存储管理应用程序的所有组件状态，并以相应的规则保证状态以一种可预测的方式发生变化。

为什么要使用vuex：
- 多个视图依赖同一状态，对于多层嵌套组件、平行组件间的状态传递很麻烦
- 来自不同视图的行为需要变更同一状态
- 接口数据存储在vuex，避免视图切换多次请求接口数据

各模块功能：
- state：全局唯一的页面状态管理容器对象。集中存储Vue组件中data对象的零散数据，以进行统一的状态管理。利用Vue的细粒度数据响应机制来进行高效的状态更新。
- getters：可以看作是state的计算属性的对象
- mutation：改变状态的操作方法。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。
- commit：改变状态的提交操作方法。对mutation进行提交。
- actions：负责处理Vue组件的行为，包括同步、异步的操作行为，支持多个同名方法、按照注册的顺序依次触发。该模块提供了Promise的封装，以支持action的链式触发。
- dispatch：是唯一能执行action的方法。

## State：
Vuex使用单一状态树，用一个对象就包含了全部的应用层级状态。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

使用计算属性获得vuex状态
```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```
使用mapState辅助我们生成计算属性
```js
import { mapState } from 'vuex'

export default {
  computed: {
    // ...

    ...mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }}
  })
}
```

## getters
可以认为是store的计算属性，`this.$store.getters.doneTodos`
```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```
给getters传参
```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

store.getters.getTodoById(2);
```
mapGetters辅助我们将getter映射到计算属性中
```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

## mutations同步事务
更改vuex的store中的状态，接收state作为第一个参数
```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
});

store.commit('increment')
```
mapMutation辅助函数将组件中的methods映射为`store.commit`，需要在根节点注入store
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## actions
- action提交的是mutation，而不是直接变更状态
- action可以包含任意异步操作

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
});
```
通过`store.dispatch`触发action，mapActions辅助函数将组件的methods映射为store.dispatch调用
```js
store.dispatch('incrementAsync')

actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```
获取action何时结束
```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}

store.dispatch('actionA').then(() => {
  // ...
})
```

## modules
```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

## v-model

```js
let Vue;

const install = (_v) => {
  Vue = _v;

  Vue.mixin({
    beforeCreate() {
      console.log(this.$options);
    }
  })
}

class Store {

}

export default {
  install,
  Store
}
```