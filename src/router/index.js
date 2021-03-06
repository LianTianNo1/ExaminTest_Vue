import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const examination = () => import("@/views/examination.vue");
const shareCenter = () => import("@/views/shareCenter.vue");
const LoginAndRegister = () => import("@/views/LoginAndRegister.vue");
const userCenter = () => import("@/views/userCenter.vue");
const start = () => import("@/views/start.vue");

// 配置路由规则
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/LoginAndRegister",
    },

    {
      path: "/examination",
      component: examination,
    },
    {
      path: "/shareCenter",
      component: shareCenter,
    },
    {
      path: "/userCenter",
      component: userCenter,
    },
    {
      path: "/LoginAndRegister",
      component: LoginAndRegister,
    },
    {
      path: "/start",
      component: start,
    },
  ],
});

// 路由守卫
const pathList = [
  "/examination",
  "/record",
  "/userCenter",
  "/shareCenter",
  "/start",
];
router.beforeEach((to, from, next) => {
  if (pathList.includes(to.path)) {
    const token = JSON.parse(sessionStorage.getItem("isLogin"));
    if (token !== null) {
      next();
    } else {
      next("/LoginAndRegister");
    }
  } else {
    next();
  }
});

export default router;
