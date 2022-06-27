import { Module } from 'vuex';
import type { IRootState } from '../../types';
import type { IProductState } from './types';
import { formatUtcString } from '@/utils';
import { getPageListData, createPageData, editPageData, deletePageData } from '@/service/main/product/product';

const productModule: Module<IProductState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsList: [],
      goodsCount: 0,
      categoryList: [],
      categoryCount: 0
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
    changeGoodsList(state, goodsList: any[]) {
      goodsList.forEach((good) => {
        good.createAt = formatUtcString(good?.createAt);
        good.updateAt = formatUtcString(good?.updateAt);
      });
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeCategoryList(state, categoryList: any[]) {
      categoryList.forEach((category) => {
        category.createAt = formatUtcString(category?.createAt);
        category.updateAt = formatUtcString(category?.updateAt);
      });
      state.categoryList = categoryList;
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount;
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
    }
  }
};

export default productModule;
