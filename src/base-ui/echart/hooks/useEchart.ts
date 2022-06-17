import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

export default function (el: HTMLElement) {
  // 1.初始化echarts实例(需绑定dom元素)
  const echartInstance = echarts.init(el);
  // 2.编写配置文件,并且开始绘制(已抽取到外界)
  const setOptions = (options: EChartsOption) => echartInstance.setOption(options);

  // 点击折叠,手动调用resize
  const updateResize = () => echartInstance.resize();

  window.addEventListener('resize', () => echartInstance.resize());

  return {
    echartInstance,
    setOptions,
    updateResize
  };
}
