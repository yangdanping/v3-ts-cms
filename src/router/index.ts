import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { LocalCache } from '@/utils';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/Main.vue')
    // children:[]->根据userMenus来动态决定
  },
  {
    path: '/:patchMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHistory()
  // history: createWebHashHistory()
});
// 方案一:路由全部注册
// 方案二:登录 -> suerInfo -> role.name -> 根据不同角色动态注册路由
// superadmin:[{},{},{}]
// admin[{},{}]
// user:[{}]
// 弊端:当新增角色后,要修改前端代码,重新部署
// 方案三:拿到菜单后动态生成路由映射,菜单(url) -> 路由(path) -> 路由(component)

// 通过前置路由守卫来进行登录判断
router.beforeEach((to, from) => {
  console.log(`<路由守卫>检测到路由 ${from.path} --> ${to.path}`);
  // 当路由不在登录页,就通过token判断是否已登录
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token');
    if (!token) {
      console.log('未登录');
      return '/login';
    }
  }
});

export default router;
