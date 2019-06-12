/*
* 在getters里面可以做一些全局的过滤操作
* */

export default {
  // 获取系统菜单列表
  getMenuList (state) {
    return state.menuList;
  },
  // 获取当前用户信息
  getUserInfo (state) {
    return state.user;
  }
};
