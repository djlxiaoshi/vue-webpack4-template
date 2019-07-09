/**
 * 初始化文件
 */

import Vue from 'vue';
import Router from 'vue-router';
import http from './utils/http';
import envConfig from './global/environment';
import sweetAlert from 'assets/js/utils/alert.js';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import './resize';

// Element-UI组件按需加载
import { Button, Menu, MenuItem, Submenu, Input,
  Dropdown, DropdownMenu, DropdownItem, Row, Col,
  Form, FormItem, Card, Upload, Tag, Checkbox, CheckboxGroup,
  MessageBox, Notification, Message, Loading, Pagination, Dialog,
  Radio, RadioGroup, Select, Option
} from 'element-ui';

import 'izitoast/dist/css/iziToast.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import '../css/common.less';
import 'nprogress/nprogress.css';

Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Card);
Vue.use(Upload);
Vue.use(Tag);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);

Vue.use(Router);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.prototype.$http = http;
Vue.prototype.$alert = sweetAlert;
Vue.prototype.$globalConfig = envConfig;

// 自动化注册全局组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  '../../components/common',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  const regexp = /.+\/(.+)\./;
  // 剥去文件名开头的 `'./` 和结尾的扩展名
  fileName = regexp.exec(fileName)[1];

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
  // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName
    )
  );
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});
