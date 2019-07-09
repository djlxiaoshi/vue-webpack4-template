import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import Vue from 'vue';

Vue.use(Vuex);

// 显示设置打开vue调试工具
// https://github.com/vuejs/vue-devtools/issues/190
// https://github.com/vuejs/vue-devtools/issues/405#issuecomment-399882681 放在这里的原因
Vue.config.devtools = true;

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
