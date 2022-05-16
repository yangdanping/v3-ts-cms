import axios from 'axios'; //对axios做封装只需在这一个文件里引用axios就可以了(相当于当前项目对axios有依赖的只有该文件)
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'; //axios已提供对应的类型(三者缺一不可)

interface MyRequestInterceptors {
  reqSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig; //函数类型,该函数参数是AxiosRequestConfig类型的config,返回值也是该类型
  reqFail?: (error: any) => any;
  resSuccess?: (config: AxiosResponse) => AxiosResponse;
  resFail?: (error: any) => any;
}

// 定义MyRequestConfig,继承自官方提供的接口(把构造器中config:AxiosRequestConfig换成config:MyRequestConfig)
interface MyRequestConfig extends AxiosRequestConfig {
  // 对原来的ARC类型做扩展(在原来的基础上增添了可选的interceptors属性)
  interceptors?: MyRequestInterceptors;
}

class MyRequest {
  instance: AxiosInstance;
  interceptors?: MyRequestInterceptors;

  constructor(config: MyRequestConfig) {
    // 1.创建axios实例 --> (一切的起点,非常重要,我们之前用axios本质上是用axios对象的一个实例)
    this.instance = axios.create(config);
    // 2.保存基本信息
    this.interceptors = config.interceptors;
    // 3.真正的使用该实例自己的拦截器 --> (把别人传进来的拦截函数放到实例里的拦截器给他做一个应用,注意写成可选链)
    this.instance.interceptors.request.use(this.interceptors?.reqSuccess, this.interceptors?.reqFail);
    this.instance.interceptors.response.use(this.interceptors?.resSuccess, this.interceptors?.resFail);
    // 4.设置全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截器请求成功');
        return config;
      },
      (err) => err
    );
    this.instance.interceptors.response.use(
      (config) => {
        console.log('全局响应拦截器响应成功');
        return config;
      },
      (err) => err
    );
  }
  // 封装request等请求 --> (要在内部做单个请求的拦截器,所以把config:AxiosRequestConfig换成config:MyRequestConfig)
  // 注意!这里改config的类型为MyRequestConfig
  request(config: MyRequestConfig): void {
    // 单个请求的请求拦截器,若有reqSuccess函数,那我在内部执行一些这个函数就可以了(把拦截器函数返回的转化后的config替换掉原生config)
    if (config.interceptors?.reqSuccess) {
      config = config.interceptors.reqSuccess(config);
    }

    this.instance.request(config).then((res) => {
      // 单个请求的响应拦截器,对数据的处理-----------------------------------------
      if (config.interceptors?.resSuccess) {
        res = config.interceptors.resSuccess(res);
      }
      const realData = res.data;
      console.log('request请求结果', realData);
      return realData;
    });
  }
}

export default MyRequest;
