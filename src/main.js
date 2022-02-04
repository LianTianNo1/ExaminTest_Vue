import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import { Icon, Message } from "element-ui";
// 在调用 Vue.use 前，给 Message 添加 install 方法
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message;
};
Vue.use(Icon);
Vue.use(Message);
Vue.prototype.router = router;

const instance = axios.create({
  timeout: 10000,
});
Vue.prototype.$axios = instance;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
