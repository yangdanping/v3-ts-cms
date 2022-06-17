import { IBreadcrumb } from '@/base-ui/breadcrumb';
import type { RouteRecordRaw } from 'vue-router';

let firstMenu: any = null; //用于获取到第一个menu对象,然后到路由导航守卫将重定向的/main再重定向到第一个menu对象url

/**
 * 通过默认菜单与用户菜单(登录用户所拥有访问权菜单)映射成在最终显示的菜单
 * @param userMenus 用户菜单
 * @returns 该用户最终显示的菜单
 */
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
        if (!firstMenu) {
          firstMenu = menu; //在映射时保留第一个菜单
        }
        targetRoute && routes.push(targetRoute);
      }
    });
  };
  recurseGetRoute(userMenus);
  return routes;
}

/**
 * 通过映射实现点击记住菜单选项
 * @param userMenus 用户菜单
 * @param currentPath 当前路由
 * @returns 当前路由对应的菜单对象
 */
// 原来的思路 --> 点击菜单调用事件来获取id,但如何保存是个问题,所以想到获取当前路由与userMenus匹配的方法
export function pathMapToMenu(userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  // 有return要用for..of
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        // 找到一级菜单则顺便实现面包屑
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        console.log('当前路由', currentPath, '对应的菜单对象', { ...findMenu });
        return findMenu; // 最终在这里返回子菜单
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
  return breadcrumbs; //在传入第三个参数时,说明要得到面包屑
}

export { firstMenu };

/**
 * 实现面包屑 在pathMapToMenu的基础上找到一级菜单和其父级菜单,push进数组即可
 * @param userMenus 用户菜单
 * @param currentPath 当前路由
 * @returns 当前菜单对应的面包屑
 */
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

/**
 * 通过菜单获取权限
 * @param userMenus 用户菜单
 * @returns 当前用户权限
 */
// 用户的按钮权限在后端传入的userMenus中的三级菜单中,所以先在这里取到所有的按钮权限放到数组permissions中
export function mapMenusToPermssions(userMenus: any[]) {
  const permissions: string[] = [];

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };

  _recurseGetPermission(userMenus);

  return permissions;
}

/**
 * 使角色权限回显至el-tree
 * @param menuList 用户菜单
 * @returns 返回叶子结点
 */
export function menuMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = [];
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children);
      } else {
        leafKeys.push(menu.id);
      }
    }
  };
  _recurseGetLeaf(menuList);
  return leafKeys;
}
