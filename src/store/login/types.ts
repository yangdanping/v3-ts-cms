/**
 * 当前模块中state的类型
 */
export interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any[];
  permissions: string[];
}
