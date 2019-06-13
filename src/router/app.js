const HomePage = () => import(/* webpackChunkName: "home" */ 'pages/home/Index');
const AboutPage = () => import(/* webpackChunkName: "about" */ 'pages/about/Index');

export default [
  {
    path: 'home',
    label: '主页',
    component: HomePage
  },
  {
    path: 'about',
    label: '关于我',
    component: AboutPage
  },
  {
    path: '',
    hidden: true,
    redirect: 'home'
  }
];
