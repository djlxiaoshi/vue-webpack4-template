<template>
  <transition name="page-move">
    <div class="side-menu-wrap">
      <base-menu
        active-text-color="#ffd04b"
        @menuSelect = "menuSelect"
        :menuConfig="menuList">
      </base-menu>
    </div>
  </transition>
</template>

<script>
  import BaseMenu from './Menu';
  import { mapState } from 'vuex';

  export default {
    components: {
      BaseMenu
    },
    data () {
      return {
      };
    },
    computed: {
      ...mapState([
        'menuList'
      ])
    },
    methods: {
      menuSelect (menuName) {
        this.$emit('onSelect', menuName);
      }
    }
  };
</script>

<style scoped lang="less">
  .page-move-enter, .page-move-leave-active {
    transform: translate(-100%, 0 )
  }
  .page-move-enter-active, .page-move-leave-active {
    transition: transform .3s
  }

  .side-menu-wrap {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }
</style>
