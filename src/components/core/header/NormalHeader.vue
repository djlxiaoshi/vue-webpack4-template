<template>
  <div class="app-header common-container">
    <div class="header-left">
      <header-menu
        text-color="#fff"
        background-color="#545c64"
        active-text-color="#ffd04b"
        :activeMenu="activeMenu"
        mode="horizontal"
        :menuConfig="menuList"></header-menu>
    </div>

    <div class="header-right">
      <div class="avatar-wrap" v-if="user">
        <el-dropdown @command="eventHandler" trigger="click">
          <a class="user-avatar">
            <img :src="user.avatar" width="100%" v-if="user.avatar">
          </a>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">用户信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="login-or-register" v-else>
        <a class="login-btn" href="javascript:void(0)" @click="goToLoginPage">登录</a>
        <a class="register-btn" href="javascript:void(0)" @click="goToRegisterPage">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderMenu from './Menu';
  import { mapState, mapMutations } from 'vuex';
  import { SET_ACTIVE_MENU, SET_USER_INFO } from 'store/mutation-types';
  export default {
    components: {
      HeaderMenu
    },
    data () {
      return {
        selectSystem: {
          name: ''
        }
      };
    },
    computed: {
      ...mapState([
        'activeMenu',
        'user',
        'menuList'
      ])
    },
    mounted () {
    },
    methods: {
      ...mapMutations({
        'setActiveMenu': SET_ACTIVE_MENU,
        'setUserInfo': SET_USER_INFO
      }),
      eventHandler (event) {
        if (event === 'logout') {
          this.logout();
        } else if (event === 'userInfo') {
          this.$router.push('/app/user-info');
          this.setActiveMenu('');
        }
      },
      logout () {
        if (this.user) {
          const { xhrInstance } = this.$http({
            url: '/logout',
            data: {
              id: this.user._id
            }
          });

          xhrInstance.then(() => {

            this.clearUserMsg();
            this.goToLoginPage();

          });
        }
      },
      clearUserMsg () {
        this.setUserInfo(null);
      },
      goToLoginPage () {
        this.$router.push('/login');
      },
      goToRegisterPage () {
        this.$router.push('/register');
      }
    },
    watch: {

    }
  };
</script>

<style scoped lang="less">
  @import "../../../assets/css/theme";
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: @pageHeaderBg;

    .header-left {

    }

    .header-right {
      flex: 0 0 40px;
      .avatar-wrap {
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
      .login-or-register {
        .register-btn, .login-btn {
          color: #ffffff;
          padding: 0 5px 5px 5px;
          &:hover {
            color: rgb(255, 208, 75);
          }
        }
      }
    }
  }

</style>
