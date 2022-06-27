import { Module } from 'vuex';
import type { IRootState } from '../../types';
import type { ISystemState } from './types';
import { formatUtcString } from '@/utils';
import { getPageListData, createPageData, editPageData, deletePageData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => (state as any)[`${pageName}List`];
    },
    pageListCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`];
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
    },
    changeMenuList(state, menuList: any[]) {
      menuList.forEach((menu) => {
        menu.createAt = formatUtcString(menu?.createAt);
        menu.updateAt = formatUtcString(menu?.updateAt);
      });
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
    changeDepartmentList(state, departmentList: any[]) {
      departmentList.forEach((deparment) => {
        deparment.createAt = formatUtcString(deparment?.createAt);
        deparment.updateAt = formatUtcString(deparment?.updateAt);
      });
      state.departmentList = departmentList;
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const { pageName, queryInfo } = payload;
      const pageUrl = `${pageName}/list`;
      // 2.发送请求
      const res = await getPageListData(pageUrl, queryInfo);
      // 3.将数据存储到state中
      const { list, totalCount } = res.data;
      console.log('getPageListAction', list, totalCount);

      const changePageName = (pageName.slice(0, 1) as string).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload;
      const pageUrl = `${pageName}`;
      await createPageData(pageUrl, newData);
      // 创建完后要请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id(用来拼接url,如/users/id)
      const { pageName, id } = payload;
      const pageUrl = `${pageName}/${id}`;
      // 2.调用删除网络请求
      const res = await deletePageData(pageUrl);
      console.log('deletePageDataAction res', res);
      // 3.重新获取数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },

    async editPageDataAction({ dispatch }, payload: any) {
      const { id, pageName, editData } = payload;
      const pageUrl = `${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      // 编辑完后要请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};

export default systemModule;
