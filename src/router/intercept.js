/*
*  总体描述：关于权限的问题可以分为大的三类
*  1 不需要登录就可以进入的（例如登录、注册页）
*  2 需要登录才能进入的 （例如用户信息页）
*  3 用户登录之后根据用户角色才能进入的 （VIP页）
*
*   那么我们怎么知道哪些路由是需要登录，哪些路由组件是需要更高的权限呢，那就是在路由配置的meta属性
*   中添加配置例如：meta: { RequiredLogin: true, RequiredPermission: false }
*
*   首先管理平台是肯定要做登录拦截的，即在用户处于登录状态才能进入主系统
*   那么就要在跟路由('/')下做路由拦截，根据路由的meta信息决定是否需要登录等等
*
*   配置项说明
*     path：路由路径
*     icon：菜单icon
*     label：菜单名称
*     component：路由组件
*     hidden：这个路由是否显示在菜单中
* */

import store from '../store';
import { SET_MENU_LIST, SET_USER_INFO, SET_ACTIVE_MENU } from '../store/mutation-types';
import http from '../assets/js/utils/http';

/**
 * 检测用户是否登录
 * @param next
 */
function userIsLogin (next) {
  const { xhrInstance } = http({
    url: '/getUserInfo'
  });
  return xhrInstance;
}

/**
 * 设置当前激活菜单
 * @param matchedRouter
 */
function setCurrentMenu (matchedRouter) {
  store.commit(SET_ACTIVE_MENU, matchedRouter.path);
}

export default function (router) {

  router.beforeEach(async (to, from, next) => {
    const matched = to.matched;
    const finallyMatched = to.matched[matched.length - 1];
    // 判断是否需要登录
    if (finallyMatched.meta.NoRequiredLogin) {
      next();
    } else {

      // 用户未登录
      if (!store.state.user) {

        try {
          const result = await userIsLogin();

          store.commit(SET_USER_INFO, result);
          store.commit(SET_MENU_LIST, result ? (result.menu || []) : []);
        } catch (e) {
          console.error('服务器异常', e);
          // next('/server-exception'); // 由于有pwa
          next();
        }
      }

      // 用户已登录，然后再判断权限
      if (store.state.user) {
        // 如果需要权限，且权限不通过
        if (finallyMatched.meta.permissionList &&
          !~finallyMatched.meta.permissionList.indexOf(store.state.user.roleId)
        ) {
          next('/no-permission');
        } else {
          // 权限通过 或者 不需要权限

          // 同步activeMenu （包括浏览器直接输入地址和点击菜单）
          setCurrentMenu(finallyMatched);
          next();
        }
      }
    }
  });
};
