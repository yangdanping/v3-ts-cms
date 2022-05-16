import router from '@/router';
import { accountLoginRequest, requestUserInfoById, requestUserMenuByRoleId } from '@/service/login/login';
import { LocalCache } from '@/utils';
import type { Module } from 'vuex';
import type { IRootState } from '../types';
import type { ILoginState } from './types';

// Module类型要求传入两个泛型类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any[]) {
      state.userMenus = userMenus;
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload) {
      // 1.实现登录逻辑
      const accountResult = await accountLoginRequest(payload);
      console.log('拿到登录结果', accountResult);
      const { id, token } = accountResult.data;
      // token存放在store和本地缓存中,然后再myRequest请求拦截器中,就能获取本地缓存的token
      commit('changeToken', token);
      LocalCache.setCache('token', token);
      // 2.拿到id请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      LocalCache.setCache('userInfo', userInfo);
      // 由于跳转到首页要展示用户信息,所以用户信息也缓存到本地
      console.log('用户信息', userInfo);
      // 3.拿到用户角色id请求用户菜单
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus);
      LocalCache.setCache('userMenus', userMenus);
      console.log('用户菜单', userMenus);
      // 4.跳到首页
      await router.push('/main');
    },
    async loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token');
      token && commit('changeToken', token);
      const userInfo = LocalCache.getCache('userInfo');
      userInfo && commit('changeUserInfo', userInfo);
      const userMenus = LocalCache.getCache('userMenus');
      userMenus && commit('changeUserMenus', userMenus);
    }
  },
  modules: {}
};

export default loginModule;
