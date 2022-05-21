/* eslint-disable */
/* declare可以声明某些文件为模块类型,以及模块里面导出什么东西 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare let $store: any;
