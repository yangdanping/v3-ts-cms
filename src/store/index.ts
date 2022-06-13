import { createStore, Store, useStore as useVuexStore } from 'vuex';
import loginModule from './login/login';
import systemModule from './main/system/system';
import productModule from './main/product/product';
import { getPageListData } from '@/service/main/product/product';

import type { IRootState, IStoreType } from './types';
// 指定IRootState类型(模块中是不能加的)

const store = createStore<IRootState>({
  state() {
    return {
      name: 'ydp',
      age: 24,
      entireDepartment: [],
      entireRole: []
    };
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, payload) {
      console.log('changeEntireDepartment');
      state.entireDepartment = payload;
    },
    changeEntireRole(state, payload) {
      console.log('changeEntireRole');
      state.entireRole = payload;
    }
  },
  actions: {
    async getInitDataAction({ commit }) {
      // 1.请求部门和角色数据
      const res1 = await getPageListData('department/list', { offset: 0, size: 1000 });
      const res2 = await getPageListData('role/list', { offset: 0, size: 1000 });
      commit('changeEntireDepartment', res1.data.list);
      commit('changeEntireRole', res2.data.list);
    }
  },
  modules: {
    login: loginModule,
    product: productModule,
    system: systemModule
  }
});

// 若刷新则对state中的东西做初始化(将请求下来的已保存在本地缓存的数据,初始化给store)
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
  // store.dispatch('getInitDataAction');//不走在这里做,因为token还没请求下来
}

// 为了获得更好的ts类型支持,对vuex的useStore进行封装
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
