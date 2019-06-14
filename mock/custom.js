const Mock = require('mockjs');
const faker = require('faker');
const { getArrayData } = require('./utils');

module.exports = function (server) {
  // 获取用户信息
  server.get('/getUserInfo', (req, res) => {
    res.jsonp({
      data: Mock.mock({
        'id': 1,
        'username|+1': getArrayData(faker.name.findName, 5),
        'roleId|0-3': 0,
        'menu': [
          {
            'label': '主页',
            'path': '/app/home'
          },
          {
            'label': '关于我',
            'path': '/app/about'
          }
        ]
      }),
      code: 0,
      message: ''
    });
  });
};
