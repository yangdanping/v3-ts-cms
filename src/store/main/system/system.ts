import { Module } from 'vuex';
import type { IRootState } from '../../types';
import type { ISystemState } from './types';
import { formatUtcString } from '@/utils';
import { getPageListData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      usersList.forEach((user) => {
        user.createAt = formatUtcString(user?.createAt);
        user.updateAt = formatUtcString(user?.updateAt);
      });
      state.usersList = usersList;
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    changeRoleList(state, roleList: any[]) {
      roleList.forEach((role) => {
        role.createAt = formatUtcString(role?.createAt);
        role.updateAt = formatUtcString(role?.updateAt);
      });
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const { pageName, queryInfo } = payload;
      const pageUrl = `/${pageName}/list`;
      // 2.发送请求
      const res = await getPageListData(pageUrl, queryInfo);
      // 3.将数据存储到state中
      const { list, totalCount } = res.data;
      console.log('getPageListAction', list, totalCount);

      const changePageName = (pageName.slice(0, 1) as string).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    }
  }
};

export default systemModule;
