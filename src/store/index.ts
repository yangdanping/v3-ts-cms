import { createStore, Store, useStore as useVuexStore } from 'vuex';
import loginModule from './login/login';
import systemModule from './main/system/system';
import type { IRootState, IStoreType } from './types';
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
    login: loginModule,
    system: systemModule
  }
});

// 若刷新则对state中的东西做初始化(将请求下来的已保存在本地缓存的数据,初始化给store)
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

// 为了获得更好的ts类型支持,对vuex的useStore进行封装
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
