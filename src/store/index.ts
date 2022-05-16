import { createStore } from 'vuex';
import loginModule from './login/login';
import type { IRootState } from './types';
// 指定IRootState类型(模块中是不能加的)

const store = createStore<IRootState>({
  state() {
    return {
      name: 'ydp',
      age: 24
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login: loginModule
  }
});

// 若刷新则对state中的东西做初始化(将请求下来的已保存在本地缓存的数据,初始化给store)
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

export default store;
