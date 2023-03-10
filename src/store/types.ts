import { ILoginState } from './login/types';
import { IProductState } from './main/product/types';
import { ISystemState } from './main/system/types';
import { IDashboardState } from './main/analysis/types';

/**
 * 根store中state的类型
 */
export interface IRootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

/**
 * 定义了store中所有模块的类型
 */
export interface IRootWithModule {
  login: ILoginState; // 以后每加一个模块都在这里也加上它的类型
  system: ISystemState;
  product: IProductState;
  dashboard: IDashboardState;
}

// 定义一个交叉类型(将两个接口结合在一起)
export type IStoreType = IRootState & IRootWithModule;
