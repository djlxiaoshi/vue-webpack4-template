<template>
    <div>
      <AppHeader></AppHeader>

      <div class="app-body">
        <el-row type="flex" align="middle" justify="center">
          <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
            <router-view></router-view>
          </el-col>
        </el-row>
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
  @import "../assets/css/theme";
  .app-body {
    margin-top: @AppHeaderHeight;
  }
</style>
