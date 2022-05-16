import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { LocalCache } from '@/utils';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/Main.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHistory()
});
// 通过前置路由守卫来进行登录判断
router.beforeEach((to, from) => {
  console.log(`<路由守卫>检测到路由 ${from.path} --> ${to.path}`);
  // 当路由不在登录页,就通过token判断是否已登录
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token');
    if (token) {
      console.log('已登录');
      return '/main';
    } else {
      console.log('未登录');
      return '/login';
    }
  }
});

export default router;
