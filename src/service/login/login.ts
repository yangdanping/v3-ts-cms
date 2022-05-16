import myRequest from '../index';
// // 1.定义并导出类型(这里也可以用)-------------------------------------------------
import type { IAccount, ILoginResult } from './types';
import type { IDataType } from '@/service/types';

// 为了防止以后url改掉,用枚举定义url
enum LoginAPI {
  AccountLoginUrl = '/login',
  LoginUserUrl = '/users/', //注意看接口要求请求用户信息数据是个get请求(示例 /user/1)
  UserMenus = '/role/' //示例 /role/1/menu
}

// // 2.定义并导出方法,在login模块的action中实现--------------------------------------
export function accountLoginRequest(account: IAccount) {
  // 由于要确定data的类型,所以里IDataType加入泛型并传入ILoginResult,来确定返回的data的类型
  return myRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLoginUrl,
    data: account //body里的东西是放到data里的
  });
}
export function requestUserInfoById(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.LoginUserUrl + id, //注意在这里要拼接上用户的id,这样就知道请求哪个用户了
    showLoading: false
  });
}
export function requestUserMenuByRoleId(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  });
}

// 测试
// export function requestTest() {
//   myRequest
//     .request<IDataType>({
//       url: 'http://123.207.32.32:8000/home/multidata',
//       method: 'GET',
//       // showLoading: false,
//       interceptors: {
//         reqSuccess: (config) => {
//           console.log('单个请求拦截器!!', config);
//           return config;
//         },
//         resSuccess: (res) => {
//           console.log('单个响应拦截器!!', res);
//           return res;
//         }
//       }
//     })
//     .then((res) => {
//       console.log('test!!!', res.data);
//     });
// }
