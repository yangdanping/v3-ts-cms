import axios from 'axios'; //对axios做封装只需在这一个文件里引用axios就可以了(相当于当前项目对axios有依赖的只有该文件)
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'; //axios已提供对应的类型(三者缺一不可)

interface MyRequestInterceptors {
  reqSuccess: (config: AxiosRequestConfig) => AxiosRequestConfig; //函数类型,该函数参数是AxiosRequestConfig类型的config,返回值也是该类型
  reqFail: (error: any) => any;
  resSuccess: (config: AxiosResponse) => AxiosResponse;
  resFail: (error: any) => any;
}

class MyRequest {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // 1.创建axios实例 --> (一切的起点,非常重要,我们之前用axios本质上是用axios对象的一个实例)
    this.instance = axios.create(config);
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      const realData = res.data;
      console.log('request请求结果', realData);
      return realData;
    });
  }
}

export default MyRequest;
