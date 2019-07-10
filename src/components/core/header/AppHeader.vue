<template>
  <header class="app-header">
    <mini-header v-if="isMiniWidth"></mini-header>
    <normal-header v-else></normal-header>
  </header>

</template>

<script>
  import MiniHeader from './MiniHeader';
  import NormalHeader from './NormalHeader';

  import { mapState } from 'vuex';

  export default {
    components: {
      MiniHeader,
      NormalHeader
    },
    data () {
      return {};
    },
    computed: {
      ...mapState([
        'isMiniWidth'
      ])
    }
  };
</script>

<style scoped lang="less">
  @import "../../../assets/css/theme";
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: @AppHeaderHeight;
    background: @pageHeaderBg;
  }
</style>
