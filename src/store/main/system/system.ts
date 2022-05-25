import { Module } from 'vuex';
import type { IRootState } from '../../types';
import type { ISystemState } from './types';
import { getPageListData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    };
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList;
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      const { pageUrl, queryInfo } = payload;
      const res = await getPageListData(pageUrl, queryInfo);
      const { list, totalCount } = res.data;
      console.log('getPageListAction', list, totalCount);
      commit('changeUserList', list);
      commit('changeUserCount', totalCount);
    }
  }
};

export default systemModule;
