import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const examination = () => import("@/views/examination.vue");
const record = () => import("@/views/record.vue");
const LoginAndRegister = () => import("@/views/LoginAndRegister.vue");
const userCenter = () => import("@/views/userCenter.vue");

// 配置路由规则
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/examination",
    },

    {
      path: "/examination",
      component: examination,
    },
    {
      path: "/record",
      component: record,
    },
    {
      path: "/userCenter",
      component: userCenter,
    },
    {
      path: "/LoginAndRegister",
      component: LoginAndRegister,
    },
  ],
});

export default router;
