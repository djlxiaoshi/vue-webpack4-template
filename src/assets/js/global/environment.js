/*
*  环境配置文件
*  根据不同环境，获取不同环境的接口
* */

let environment = {};

const development = {
  SERVER_ADDRESS: 'http://localhost:3000' // 开发环境后端接口地址
};

const test = {
  SERVER_ADDRESS: 'http://localhost:3000' // 测试环境后端接口地址
};

const production = {
  SERVER_ADDRESS: 'http://localhost:3000' // 正式环境后端接口地址
};

switch (process.env.NODE_ENV) {
  case 'development':
    environment = development;
    break;
  case 'test':
    environment = test;
    break;
  case 'production':
    environment = production;
    break;
  default:
    environment = development;
}

export default environment;
