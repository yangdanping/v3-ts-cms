import { ILoginState } from './login/types';
import { ISystemState } from './main/system/types';

/**
 * 根store中state的类型
 */
export interface IRootState {
  name: string;
  age: number;
}

/**
 * 定义了store中所有模块的类型
 */
export interface IRootWithModule {
  login: ILoginState; // 以后每加一个模块都在这里也加上它的类型
  system: ISystemState;
}

// 定义一个交叉类型(将两个接口结合在一起)
export type IStoreType = IRootState & IRootWithModule;
