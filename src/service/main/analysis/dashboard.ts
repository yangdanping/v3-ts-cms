import myRequest from '../../index';
import type { IDataType } from '@/service/types';

enum DashboardAPI {
  categoryGoodsCount = 'goods/category/count',
  categoryGoodsSale = 'goods/category/sale',
  categoryGoodsFavor = 'goods/category/favor',
  addressGoodsSale = 'goods/address/sale'
}

export function getCategoryGoodsCount() {
  return myRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  });
}
export function getCategoryGoodsSale() {
  return myRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  });
}
export function getCategoryGoodsFavor() {
  return myRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  });
}
export function getAddressGoodsSale() {
  return myRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  });
}
