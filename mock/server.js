const jsonServer = require('json-server');
const db = require('./db');
const customRes = require('./custom');

const server = jsonServer.create();
const router = jsonServer.router(db());
const middlewares = jsonServer.defaults();

server.use(middlewares);

// 当请求方式为POST/PUT/PATCH 的时候，要将数据进行转换
server.use(jsonServer.bodyParser);

// 用户自定义返回
customRes(server);

router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    code: 0,
    message: ''
  });
};

server.use(router);

server.listen(3700, () => {
  console.log('JSON Server is running');
});
