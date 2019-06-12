import HomePage from 'pages/home/Index';

export default [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: '',
    redirect: 'home'
  }
];
