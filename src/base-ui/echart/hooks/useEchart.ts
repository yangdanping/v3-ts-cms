import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

import chinaMapData from '../data/china.json';

import { emitter, LocalCache } from '@/utils';

echarts.registerMap('china', chinaMapData); //注册中国地图
emitter.on('changeThemeType', (theme) => {
  console.log('theme', theme);
  const globalTheme = theme ? 'dark' : '';
  LocalCache.setCache('theme', globalTheme);
});

export default function (el: HTMLElement) {
  // 1.初始化echarts实例(需绑定dom元素)
  const echartInstance = echarts.init(el, LocalCache.getCache('theme'));
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
