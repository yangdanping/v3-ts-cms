import type { App } from 'vue';
import router from '@/router';
import store, { setupStore } from '@/store';

export default function init(this: App): void {
  // 1.使用vue-router
  this.use(router);
  setupStore(); // 初始化数据
  // 2.使用vuex
  this.use(store);

  this.mount('#app');
}
