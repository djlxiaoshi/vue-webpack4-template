<template>
  <div class="exception-page">
    <div>
      <img :src="exceptionImg">
      <div class="exception-text">
        <h1 class="exception-desc">{{ desc }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import NotFoundImg from './img/not-found-exception.svg';
  import NoPermissionImg from './img/no-permission-exception.svg';
  import ServerExceptionImg from './img/server-exception.svg';

  export default {
    name: '',
    data () {
      return {
        exceptionImg: NotFoundImg
      };
    },
    props: {
      type: {

      },
      desc: {
        type: String,
        default: '404!!!页面不见了'
      }
    },
    watch: {
      type (value) {
        switch (value) {
          case 404:
            this.exceptionImg = NotFoundImg;
            break;
          case 503:
            this.exceptionImg = NoPermissionImg;
            break;
          case 500:
            this.exceptionImg = ServerExceptionImg;
            break;
          default:
            this.exceptionImg = NotFoundImg;
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .exception-page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .exception-desc {
      margin: 40px 0;
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      color: #bac8c4;
    }
  }
</style>
