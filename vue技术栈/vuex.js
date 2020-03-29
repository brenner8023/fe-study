let Vue;
const install = v => {
  console.log(v);
  Vue = v;
  Vue.mixin({
    beforeCreated() {
      console.log(this.$options);
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.parent.$store;
      }
    }
  });
}

class Store {
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state
      }
    });
    let getters = options.getters || {};
    this.getters = {};
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(this.getters, getterName, {
        get() {
          return getters[getterName](this.state);
        }
      });
    });

    let mutation = options.mutation || {};
    this.mutation = {};
    Object.keys(mutation).forEach(mutationName => {
      this.mutation[mutationName] = payload => {
        mutation[mutationName](this.state, payload);
      };
    });

    let actions = options.actions || {};
    this.actions = {};
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] = payload => {
        actions[actionName](this, payload);
      }
    });
  }
  get state() {
    return this.vm.state;
  }
  commit = (method, payload) => {
    this.mutation[method](payload);
  }
  dispatch(method, payload) {
    this.actions[method](payload);
  }
}

export default {
  install,
  Store
}