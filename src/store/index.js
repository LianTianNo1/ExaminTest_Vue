import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: "",
    userInfo: {},
    nowTestExamin: {},
    // baseURL: "http://127.0.0.1:3000",
    baseURL: "",
    // baseURL: "http://120.25.249.159:3000",
  },
  mutations: {
    updataStatus(state, params) {
      state.isLogin = params;
    },
    updataUserInfo(state, params) {
      state.userInfo = params;
    },
    setNowTestExamin(state, params) {
      state.nowTestExamin = params;
    },
  },
  actions: {},
  modules: {},
});
