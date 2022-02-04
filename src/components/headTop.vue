<template>
  <div class="box">
    <div class="headinfo">
      <img class="head_title" src="../assets/logo.png" />

      <div class="rightgroupIcon el-icon-menu"></div>
      <div class="rightgroup">
        <router-link class="el-icon-collection-tag" to="/start"
          >开始</router-link
        >
        <router-link class="el-icon-upload2" to="/examination"
          >上传练习</router-link
        >
        <router-link class="el-icon-connection" to="/shareCenter"
          >共享中心</router-link
        >
        <router-link class="el-icon-user" to="/userCenter"
          >个人中心</router-link
        >
        <router-link class="el-icon-key" v-if="!isLogin" to="/LoginAndRegister"
          >登录/注册</router-link
        >
        <a href="#" class="el-icon-circle-close" @click.stop="logout" v-else
          >退出登录</a
        >
      </div>
    </div>
    <keep-alive exclude="examination">
      <router-view v-if="isRouterShow" @reloadComponent="reload"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "headTop",
  data() {
    return {
      isRouterShow: true,
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  created() {
    this.updataStatus(JSON.parse(sessionStorage.getItem('isLogin')))
  },
  methods: {
    ...mapMutations(['updataStatus']),
    logout() {
      sessionStorage.setItem('isLogin', 'null')
      this.updataStatus(JSON.parse(sessionStorage.getItem('isLogin')))
      this.router.push('/LoginAndRegister');
      // console.log(this.isLogin, typeof this.isLogin)
    },
    async reload() {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    }
  },
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  margin: 0;
  height: 100vh;
  background-color: #96adc8;
}

#app {
  margin: 0;
  background-color: #9da8b6;
}
.box {
  box-shadow: 0px 5px 40px 0px #113a5d1a;
}
.headinfo:hover div.rightgroup {
  display: flex;
}
.headinfo {
  padding: 0 2rem;
  margin-bottom: 2vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  background: #fff;
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.headinfo::before {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(20px);
  box-shadow: inset 0px 3px 0px 3px black;
  content: '';
  background: url(../assets/bg.png) no-repeat;
  background-size: cover;
  transform: perspective(1px) scale(2.1);
  z-index: -1;
}
.head_title {
  height: 100%;
  padding: 9px 15px;
}
.rightgroupIcon {
  color: #6d6d6d;
  display: none;
  cursor: pointer;
  @media screen and (max-width: 450px) {
    display: block;
  }
}
.rightgroup {
  display: flex;
  height: 100%;
  padding: 0 1rem;
  transition: all 1s;
  @media screen and (max-width: 450px) {
    display: none;
    z-index: 999999999999999;
    height: 300px;
    position: absolute;
    top: 0;
    right: 10px;
    flex-direction: column;
    background-color: #fff;
    justify-content: space-evenly;
    box-shadow: 6px 8px 7px #00000042;
  }
}
.headinfo a {
  float: left;
  // color: #121212;
  color: #f5f5f5;
  padding: 0 1rem;
  text-decoration: none;
  font-size: 0.6rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all cubic-bezier(1, -0.34, 0, 0.02) 0.3s;
  @media screen and (max-width: 419px) {
    height: 40px;
  }
}
.headinfo a:hover {
  border-bottom: 3px solid #ff5e00;
  border-radius: 0 0 2px 2px;
}
</style>
