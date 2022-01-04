import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
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
