import axios from 'axios'; //对axios做封装只需在这一个文件里引用axios就可以了(相当于当前项目对axios有依赖的只有该文件)
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'; //axios已提供对应的类型(三者缺一不可)
import { ElLoading } from 'element-plus';
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';
const DEAFULT_LOADING = true;

interface MyRequestInterceptors {
  reqSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig; //函数类型,该函数参数是AxiosRequestConfig类型的config,返回值也是该类型
  reqFail?: (error: any) => any;
  resSuccess?: (res: AxiosResponse) => AxiosResponse;
  resFail?: (error: any) => any;
}

// 定义MyRequestConfig,继承自官方提供的接口(把构造器中config:AxiosRequestConfig换成config:MyRequestConfig)
interface MyRequestConfig extends AxiosRequestConfig {
  // 对原来的ARC类型做扩展(在原来的基础上增添了可选的interceptors属性)
  interceptors?: MyRequestInterceptors;
  showLoading?: boolean; //showLoading控制各个请求是否显示loading
}

class MyRequest {
  instance: AxiosInstance;
  interceptors?: MyRequestInterceptors;
  loading?: LoadingInstance; //loading保存Loading实例,先有实例才能用showLoading控制是否显示
  showLoading: boolean; //showLoading控制整体请求是否显示loading

  constructor(config: MyRequestConfig) {
    // 1.创建axios实例 --> (一切的起点,非常重要,我们之前用axios本质上是用axios对象的一个实例)
    this.instance = axios.create(config);
    // 2.保存基本信息 --> 把别人传进来所有拦截器函数保存到interceptors属性中
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEAFULT_LOADING; //默认情况下显示Loading,当某个请求不希望有Loading是就可以在该请求单独配置showLoading:false
    // 3.真正的使用该实例自己的拦截器 --> (把别人传进来的拦截函数放到实例里的拦截器给他做一个应用,注意写成可选链)
    this.instance.interceptors.request.use(this.interceptors?.reqSuccess, this.interceptors?.reqFail);
    this.instance.interceptors.response.use(this.interceptors?.resSuccess, this.interceptors?.resFail);

    // 4.设置全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截器请求成功');
        // 将返回的loading组件实例赋值给loading属性,与showLoading配合控制loading开关
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求...',
            background: 'rgba(0,0,0,0.5)'
          });
        }
        return config;
      },
      (err) => err
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应拦截器响应成功');
        // 请求成功后将loading移除(请求失败也得移除)
        this.loading?.close();

        const realData = res.data; //取出服务器返回的真实数据
        // 这里只是模拟数据响应失败时的情况
        if (realData.returnCode === '-1001') {
          // console.log('请求失败,将错误信息显示在界面(组件)上');
        } else {
          return realData; //返回res.data就保证了我拿到的res就是我想要的数据了
        }
      },
      (err) => {
        this.loading?.close();
        // 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~'); //真实开发是switch根据status的不同显示不同的错误信息
        }
      }
    );
  }
  // 封装request等请求 --> (要在内部做单个请求的拦截器,所以把config:AxiosRequestConfig换成config:MyRequestConfig)
  // 注意!这里改config的类型为MyRequestConfig
  request(config: MyRequestConfig): void {
    this.showLoading = config.showLoading ?? true; //类型缩小(注意!,为了不影响下一个请求,请求完后(成功/失败)应当设置回初始化值)

    // 单个请求的请求拦截器,若有reqSuccess函数,那我在内部执行一些这个函数就可以了(把拦截器函数返回的转化后的config替换掉原生config)
    if (config.interceptors?.reqSuccess) {
      config = config.interceptors.reqSuccess(config);
    }

    // 请求的真正入口
    this.instance
      .request(config)
      .then((res) => {
        // 单个请求的响应拦截器,对数据的处理-----------------------------------------
        if (config.interceptors?.resSuccess) {
          res = config.interceptors.resSuccess(res);
        }
        // 将showLoading设置为默认值,这样不会影响下一个请求
        this.showLoading = DEAFULT_LOADING;
        return res;
      })
      .catch((err) => {
        // 将showLoading设置为默认值,这样不会影响下一个请求
        this.showLoading = DEAFULT_LOADING;
        return err;
      });
  }

  get(config: MyRequestConfig): void {
    return this.request({ ...config, method: 'GET' });
  }
}

export default MyRequest;
