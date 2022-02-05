<template>
  <div class="head_box">
    <div class="headinfo">
      <div class="headinfobg"></div>
      <img class="head_title" src="../assets/logo.png" />
      <div class="rightgroupIcon el-icon-menu"></div>
      <div class="rightgroup">
        <a
          :class="['movebg', { active: tabAn }, 'el-icon-circle-close']"
          href="#"
          :style="'left:' + tabIndex * 20 + '%'"
          >移动背景</a
        >
        <router-link
          @click.native="addAnimate(0)"
          :class="['el-icon-collection-tag', { awhite: tabIndex === 0 }]"
          to="/start"
          >开始引导</router-link
        >
        <router-link
          @click.native="addAnimate(1)"
          :class="['el-icon-upload2', { awhite: tabIndex === 1 }]"
          to="/examination"
          >上传练习</router-link
        >
        <router-link
          @click.native="addAnimate(2)"
          :class="['el-icon-connection', { awhite: tabIndex === 2 }]"
          to="/shareCenter"
          >共享中心</router-link
        >
        <router-link
          @click.native="addAnimate(3)"
          :class="['el-icon-user', { awhite: tabIndex === 3 }]"
          to="/userCenter"
          >个人中心</router-link
        >
        <router-link
          @click.native="addAnimate(4)"
          :class="['el-icon-key', { awhite: tabIndex === 4 }]"
          v-if="!isLogin"
          to="/LoginAndRegister"
          >登录注册</router-link
        >
        <a
          href="#"
          @click="addAnimate(4)"
          :class="['el-icon-circle-close', { awhite: tabIndex === 4 }]"
          @click.stop="logout"
          v-else
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
      tabIndex: 4,
      tabAn: false
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  created() {
    this.updataStatus(JSON.parse(sessionStorage.getItem('isLogin')))
  },
  methods: {
    addAnimate(i) {
      this.tabIndex = i
      this.tabAn = true
      setTimeout(() => {
        this.tabAn = false
      }, 1000
      )
    },
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

.headinfo:hover div.rightgroup {
  display: flex;
}
.headinfo {
  box-shadow: 0px 5px 40px 0px #113a5d1a;
  padding: 0 2rem;
  margin-bottom: 2vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  background: #fff;
  position: relative;
  z-index: 2;
  @media screen and (max-width: 420px) {
    height: 8vh;
  }
}
.headinfobg {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
// .headinfobg::before {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   filter: blur(20px);
//   box-shadow: inset 0px 3px 0px 3px black;
//   content: '';
//   background: url(../assets/bg.png) no-repeat;
//   background-size: cover;
//   transform: perspective(1px) scale(2.1);
//   z-index: -1;
// }
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
  // height: 100%;
  height: 50%;
  position: relative;
  transition: all 1s;
  // display: flex;
  // padding: 0 1rem;
  // align-items: center;
  @media screen and (max-width: 450px) {
    display: none;
    z-index: 999999999999999;
    height: 250px;
    position: absolute;
    top: 0;
    right: 10px;
    flex-direction: column;
    background-color: #ffffffd4;
    justify-content: space-evenly;
    box-shadow: 6px 8px 7px #00000042;
  }
}
.headinfo a {
  float: left;
  color: #121212;
  // color: #f5f5f5;
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
    color: #121212;
  }
}
.awhite {
  color: white !important;
  transition: all cubic-bezier(1, -0.34, 0, 0.02) 1s !important;
}
.movebg {
  position: absolute;
  top: 0;
  color: transparent !important;
  border-radius: 20px;
  z-index: -1;
  background-color: #fb7299;
  transition: all cubic-bezier(1, -0.34, 0, 0.02) 1s !important;
  @media screen and (max-width: 419px) {
    display: none !important;
  }
}
.headinfo a.active {
  animation: active 1s linear infinite;
}
@keyframes active {
  50% {
    border-radius: 47% 53% 49% 51% / 77% 82% 18% 23%;
  }
  to {
    border-radius: 20px;
  }
}
.headinfo a:hover {
  border-radius: 20px;
  box-shadow: inset 0 0 0 2px #fb7299;
}
</style>
