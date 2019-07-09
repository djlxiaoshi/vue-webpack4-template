<template>
  <div>
    <el-row type="flex" align="middle" justify="center" class="mini-header">
      <el-col :span="4">
        <div class="menu-col">
          <i class="iconfont" :class="menuClass" @click="toggleSideMenu"></i>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="app-name">
          简藏
        </div>
      </el-col>
      <el-col :span="6">
        <div class="header-login">
          <a class="user-avatar" v-if="user">
            <img :src="$globalConfig.SERVER_ADDRESS + user.avatar" width="100%">
          </a>
          <div v-else>
            <a class="login-btn" href="javascript:void(0)" @click="goToLoginPage">登录</a>
            <a class="register-btn" href="javascript:void(0)" @click="goToRegisterPage">注册</a>
          </div>
        </div>
      </el-col>
    </el-row>

    <side-bar v-if="menuIsOpen" @onSelect="menuSelect"></side-bar>

  </div>

</template>

<script>
  import { mapState } from 'vuex';
  import SideBar from './SideBar';

  export default {
    data () {
      return {
        menuIsOpen: false
      };
    },
    components: {
      SideBar
    },
    computed: {
      ...mapState([
        'user'
      ]),
      menuClass () {
        return this.menuIsOpen ? 'icon-x' : 'icon-menu';
      }
    },
    methods: {
      menuSelect (menu) {
        this.menuIsOpen = false;
      },
      toggleSideMenu () {
        this.menuIsOpen = !this.menuIsOpen;
      },
      goToLoginPage () {
        this.$router.push('/login');
      },
      goToRegisterPage () {
        this.$router.push('/register');
      }
    }
  };
</script>

<style scoped lang="less">
  .mini-header {
    color: #ffffff;
    height: 100%;
    padding: 0 20px;
    .iconfont {
      font-size: 18px !important;
      cursor: pointer;
      color: #ffffff;
    }
    .app-name {
      text-align: center;
    }
    .header-login {
      text-align: right;
      .user-avatar {
        display: inline-block;
        overflow: hidden;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #e5e5e5;
        cursor: pointer;
      }
    }
  }
</style>
