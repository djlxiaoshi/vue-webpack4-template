<template>
    <div>
      <AppHeader></AppHeader>
      <div class="app-body common-container">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import AppHeader from 'components/core/header/AppHeader';

  export default {
    name: '',
    components: {
      AppHeader
    }
  };
</script>

<style scoped lang="less">
  .app-body {
    margin-top: 20px;
  }
</style>
