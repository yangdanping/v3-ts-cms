import { Module } from 'vuex';
import type { IRootState } from '../../types';
import type { IProductState } from './types';
import { formatUtcString } from '@/utils';
import { getPageListData } from '@/service/main/product/product';

const productModule: Module<IProductState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsList: [],
      goodsCount: 0
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
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
    }
  }
};

export default productModule;
