import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

import chinaMapData from '../data/china.json';

import { emitter } from '@/utils';

echarts.registerMap('china', chinaMapData); //注册中国地图
let elTheme = '';
emitter.on('changeThemeType', (theme) => {
  elTheme = theme ? 'dark' : '';
  console.log('elTheme', elTheme);
});

export default function (el: HTMLElement) {
  // 1.初始化echarts实例(需绑定dom元素)
  const echartInstance = echarts.init(el, elTheme);
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
