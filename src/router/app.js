const HomePage = () => import(/* webpackChunkName: "home" */ 'pages/home/Index');
const AboutPage = () => import(/* webpackChunkName: "about" */ 'pages/about/Index');
const UserInfo = () => import(/* webpackChunkName: "userInfo" */ 'pages/user-info/Index');

export default [
  {
    path: 'home',
    component: HomePage,
    meta: { permissionList: [ 0, 1, 2, 3 ] }
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: 'user-info',
    component: UserInfo
  },
  {
    path: '',
    hidden: true,
    redirect: 'home'
  }
];
