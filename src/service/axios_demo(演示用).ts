import axios from 'axios';

/* 导入的其实是axios实例对象,可以调用它的某个方法去发送请求
注意!!!!!!!!!!!!!!!!.then(res)中的res其实是被axios做了一层封装,封装成一个对象
对象里有config/data/headers等属性,其实我们真正请求到的数据是被放到在data属性里的
也就是说axios给我们封装的除了data的其他属性在界面中都是用不上的
我们界面里要用到的数据或者我真正想拿到的数据永远是res.data里的数据
也就是说所有的请求都需要做类似的拦截-------------所以用全局拦截完成*/
// 注释线------------------------------------------------------
axios
  .request({
    baseURL: 'http://123.207.32.32:8000',
    url: '/home/multidata',
    method: 'GET'
  })
  .then((res) => {
    console.log('1.通过axios.request得到', res);
  });
// 上面request等价于下面的写写法
// 1.模拟get请求,第一个参数必传url,拿到数据后axios内部会帮我调用resolve的
// 而且鼠标放到get上发现返回的Promise是AxiosResponse类型
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log('2.通过axios.get得到', res.data.data);
});
// axios配置全局选项
axios.defaults.baseURL = 'http://httpbin.org'; //配置baseURL
axios.defaults.timeout = 10000; //配置响应过时事件
// axios.defaults.headers = {};//配置响应过时事件
// 2.模拟get请求并且传入参数
// axios
//   //   .get('http://httpbin.org/get', {//这是我们没有配置全局baseURL必须要写的
//   .get('/get', {
//     params: { name: 'ydp', age: 23 },
//     timeout: 5000,
//     headers: {} //也可配置局部选项
//   })
//   .then((res) => {
//     console.log(res.data);
//   });
// // 3.模拟post请求并且传入参数
// axios
//   .post('/post', {
//     params: { name: 'Neo', age: 23 }
//   })e
//   .then((res) => {
//     console.log(res.data);
//   });
// 4.axios.all--->多个请求,只有这几个请求都拿到数据后才返回
axios.all([axios.get('/get', { params: { name: 'ydp', ag: 23 } }), axios.post('/post', { params: { name: 'Neo', age: 23 } })]).then((res) => {
  //都拿到数据后才会来到.then这里,res是AxiosResponse类型,真实服务器返回的数据都在.data里
  console.log('3.通过axios.all得到第一个请求结果', res[0].data);
  console.log('4.通过axios.all得到第二个请求结果', res[1].data);
});

// 5.axios的拦截-------------------------------------------------------------
// 第一个参数:传入请求发送成功时执行的函数(基本上都用这个)
// 第二个参数:传入请求发送失败时执行的函数(一般很少来到这)
axios.interceptors.request.use(
  //把请求的配置(url,params...)传进来
  (config) => {
    console.log('demo请求成功地拦截');
    //在你拦截的地方做你想做的操作,做完后再返回出去
    // 1.比如给请求添加token
    // 2.当请求还没拿到数据时显示isLoading动画
    return config; //修改后一定一定要把config返回出去
  },
  (err) => {
    console.log('demo请求失败的拦截');
    return err;
  }
);
// 第一个参数:数据响应成功(服务器正常的返回了数据/20x)执行的函数(基本上都用这个)
// 第一个参数:数据响应失败执行的函数(一般很少来到这/40x/50x)
axios.interceptors.response.use(
  (res) => {
    //response会给到我们对应的请求拿到的结果,加上.data才是服务器真正请求到的数据
    //在你拦截的地方做你想做的操作,做完后再返回出去
    console.log('demo响应成功的拦截');
    // 1.比如拿到res结果后,加上.data就是服务器真正请求到的数据,然后返回出去
    return res.data; //修改后一定一定要把res返回出去
  },
  (err) => {
    console.log('demo响应失败的拦截');
    return err;
  }
);
//注册不同的axios实例,每个实例可以有自己的baseURL/timeout/interceptor
const config1 = {
  baseURL: 'http://123.207.32.32:8000/',
  timeout: 10000
};
const request1 = axios.create(config1);
request1.request({ url: '/home/multidata' }).then((res) => {
  console.log('5.没经过拦截器处理后的res:', res);
});
// //-----------------------------------------------------------------
const config2 = {
  baseURL: 'http://123.207.32.32:8000/',
  timeout: 10000
};
const request2 = axios.create(config2);
request2.interceptors.response.use((res) => {
  return res.data.data; //注意这里,我直接拦截它的res,加上.data.data拿到我真正需要的数据
});
request2.request({ url: '/home/multidata' }).then((res) => {
  console.log('6.经过拦截器处理的res:', res);
});

// 注释线------------------------------------------------------

/* 额外补充知识------------------------------------------------------
Promise本身是可以有类型的(Promise是类,类new出来是可以跟上泛型的)
泛型<string>同时决定了resolve传入数据的类型和res的类型 */
// new Promise<string>((resolve, reject) => {
//   resolve('123');
// }).then((res) => {
//   // console.log(res);
//   console.log(res.length); //是string类型,就完全可以用string类型的方式使用他了
// });
