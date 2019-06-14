<template>
  <el-menu
    class="app-header-menu"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
    :router="true"
    :default-active="activeMenu"
    :mode="mode"
    @select="handleSelect">
      <template v-for="menu in menuConfig">
        <el-menu-item
          v-if="!menu.hidden"
          :index="menu.path"
          :key="menu.path">
          {{ menu.label }}
        </el-menu-item>
      </template>
    </el-menu>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { SET_ACTIVE_MENU } from 'store/mutation-types';

  export default {
    props: {
      mode: {
        type: String,
        default: 'vertical'
      },
      menuConfig: {
        type: Array,
        default: () => []
      },
      backgroundColor: {
        type: String
      },
      textColor: {
        type: String
      },
      activeTextColor: {
        type: String
      },
      activeMenu: {
        type: String
      }
    },
    data () {
      return {};
    },
    mounted () {
    },
    methods: {
      ...mapMutations({
        'setActiveMenu': SET_ACTIVE_MENU
      }),
      handleSelect (key) {
        // this.setActiveMenu(key);
      }
    }
  };
</script>

<style scoped lang="less">
  .app-header-menu {
    border-right: none;
    border-bottom: none;
    height: 100%;
  }
</style>
