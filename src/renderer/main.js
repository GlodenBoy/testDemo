import Vue from 'vue';
// import dayjs from 'dayjs';
import moment from 'moment';
// import axios from 'axios';
import vuescroll from 'vuescroll';
import Antd from 'ant-design-vue';
import 'moment/locale/zh-cn';
import 'ant-design-vue/dist/antd.less';
import 'vuescroll/dist/vuescroll.css';

import App from './App';
import router from './router';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
// Vue.http = Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

moment.locale('zh-cn');

Vue.use(vuescroll, {
  ops: {
    vuescroll: {
      mode: 'native',
    },
    scrollPanel: {
      scrollingX: false,
      // padding: true,
      // 有时候原声滚动条可能在左侧,
      // 请查看 https://github.com/YvesCoding/vuescroll/issues/64
      verticalNativeBarPos: 'right',
    },
    bar: {
      showDelay: 1000,
      onlyShowBarOnScroll: false,
      background: '#cecece',
      keepShow: true,
      opacity: 1,
      hoverStyle: false,
    },
  },
});

Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  // components: { App },
  router,
  // template: '<App/>',
  render: h => h(App),
  data: {
    bus: new Vue(),
  },
}).$mount('#app');
