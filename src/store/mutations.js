/**
 * mutations 里面为同步操作，直接操作state
 */

import {
  SET_USER_INFO, SET_MENU_LIST, SET_ACTIVE_MENU,
  TOGGLE_IS_MINI_WIDTH
} from './mutation-types';

export default {
  [SET_USER_INFO] (state, user) {
    state.user = user;
  },
  [SET_MENU_LIST] (state, menuList) {
    state.menuList = menuList;
  },
  [SET_ACTIVE_MENU] (state, activeMenu) {
    state.activeMenu = activeMenu;
  },
  [TOGGLE_IS_MINI_WIDTH] (state, status) {
    state.isMiniWidth = status;
  }
};
