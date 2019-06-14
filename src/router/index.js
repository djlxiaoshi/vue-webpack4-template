/**
 * 路由配置文件
 */

import Router from 'vue-router';

import App from '../App';
import UserLogin from 'pages/login/Index';
import UserRegister from 'pages/register/Index';
import ExceptionPage from 'components/common/app-exception/AppException';
import AppFramework from 'pages/Index';

import appRoutes from './app';

import routerIntercept from './intercept';

let routes = [
  {
    path: '/app',
    component: AppFramework,
    children: appRoutes
  },
  {
    path: '/login',
    component: UserLogin,
    meta: { NoRequiredLogin: true }
  },
  {
    path: '/register',
    component: UserRegister,
    meta: { NoRequiredLogin: true }
  },
  {
    path: '/not-found',
    component: ExceptionPage,
    meta: { NoRequiredLogin: true }
  },
  {
    path: '/no-permission',
    component: ExceptionPage,
    props: { type: 403 },
    meta: { NoRequiredLogin: true }
  },
  {
    path: '/server-exception',
    component: ExceptionPage,
    props: { type: 500 },
    meta: { NoRequiredLogin: true }
  },
  {
    path: '',
    redirect: '/app'
  },
  // 404 没有匹配的路由
  {
    path: '**',
    redirect: '/not-found'
  }
];

const rootRoute = [
  {
    path: '/',
    component: App,
    children: routes
  }
];

const router = new Router({
  routes: rootRoute
});

// 路由拦截
routerIntercept(router);

export default router;
