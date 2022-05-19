import type { RouteRecordRaw } from 'vue-router';

// let firstMenu: any = null; //用于获取到第一个menu对象,然后到路由导航守卫将重定向的/main再重定向到第一个menu对象url

export default function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []; //最后被映射好的数组

  // 1.默认先存放我们预先定义好的routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context('../router/main', true, /\.ts/); //require是webpack工具,用于加载某个文件夹(第二个参数决定是否递归查找,第三个用正则匹配文件)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]); //使用require拼接路径拿到route文件
    allRoutes.push(route.default);
  });
  // console.log('默认先存放我们预先定义好的routes', allRoutes);
  // 2.根据不同角色对应的不同菜单动态地加载这些不同的路由
  // 需要先判断userMenus
  // 若type为1(二级菜单) -> 取里面的children -> 若三级菜单则继续取其children...
  // 若type为2(一级菜单) -> url与预先定义的路由匹配 -> routes.push()
  // 所以若要想把菜单处理好的话这里要用递归函数

  // 在函数内部又定义了一个函数,在JS/TS里是允许的
  const recurseGetRoute = (menus: any[]) => {
    // console.log('recurseGetRoute', menus);
    menus.forEach((menu) => {
      // 一级菜单(type为2)才是我们真正点击后要做映射的菜单,所以遇到二级菜单(type为1)得先递归找到一级菜单
      if (menu.type === 1) {
        recurseGetRoute(menu.children);
      } else if (menu.type === 2) {
        const targetRoute = allRoutes.find((route) => route.path === menu.url); //find只会找到并返回一个
        targetRoute && routes.push(targetRoute);
      }
    });
  };
  recurseGetRoute(userMenus);
  return routes;
}
