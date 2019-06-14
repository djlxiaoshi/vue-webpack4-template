<template>
  <div class="exception-page">
    <img :src="exceptionConfig.exceptionImg">
    <h1 class="exception-desc">{{ exceptionConfig.desc }}</h1>
  </div>
</template>

<script>
  import NotFoundImg from './img/not-found-exception.svg';
  import NoPermissionImg from './img/no-permission-exception.svg';
  import ServerExceptionImg from './img/server-exception.svg';

  const exceptionConfig = {
    500: {
      exceptionImg: ServerExceptionImg,
      desc: '服务器异常'
    },
    404: {
      exceptionImg: NotFoundImg,
      desc: '404!!!页面不见了'
    },
    403: {
      exceptionImg: NoPermissionImg,
      desc: '无访问权限'
    }
  };

  export default {
    name: '',
    data () {
      return {
        exceptionConfig: {}
      };
    },
    props: {
      type: {
        type: Number,
        default: 404
      }
    },
    mounted () {
      this.handleExceptionType(this.type);
    },
    methods: {
      handleExceptionType (type) {
        this.exceptionConfig = exceptionConfig[type];
      }
    },
    watch: {
      type (value) {
        this.handleExceptionType(value);
      }
    }
  };
</script>

<style scoped lang="less">
  .exception-page {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .exception-desc {
      margin: 40px 0;
      font-weight: 700;
      font-size: 20px;
      color: #bac8c4;
    }
  }
</style>
