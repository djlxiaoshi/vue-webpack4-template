<template>
    <div>
      <AppHeader></AppHeader>
      <router-view></router-view>
    </div>
</template>

<script>
  import AppHeader from 'components/core/header/Index';

  export default {
    name: '',
    components: {
      AppHeader
    }
  };
</script>

<style scoped>

</style>
