<template>
  <div>
    <div class="headinfo">
      <div class="head_title">小浪简陋做题</div>
      <div class="rightgroupIcon el-icon-menu"></div>
      <div class="rightgroup">
        <router-link to="/examination">上传练习</router-link>
        <router-link to="/shareCenter">共享中心</router-link>
        <router-link to="/userCenter">个人中心</router-link>
        <router-link v-if="!isLogin" to="/LoginAndRegister"
          >登录/注册</router-link
        >
        <a href="#" @click.stop="logout" v-else>退出登录</a>
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
.headinfo:hover div.rightgroup {
  display: flex;
}
.headinfo {
  padding: 0 2rem;
  margin-bottom: 2vh;
  background-color: #333238;
  box-shadow: 0px 1px 7px #00000033;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
}

.head_title {
  height: 100%;
  color: white;
  padding: 0 20px;
  font-weight: bold;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  text-shadow: 1px 1px 0px #7d878a, 2px 2px 0px #9fabae, 3px 3px 0px #8b9598,
    4px 4px 0px #9da9ac, 5px 5px 0px #f7f7f7;
  font-family: fantasy;
  letter-spacing: 10px;
  align-items: center;
  @media screen and (max-width: 450px) {
    font-size: 1rem;
  }
}
.rightgroupIcon {
  color: white;
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
    background-color: #333238;
    position: absolute;
    top: 0;
    right: 10px;
    flex-direction: column;
    justify-content: space-evenly;
  }
}
.headinfo a {
  float: left;
  color: white;
  padding: 0 1rem;
  text-decoration: none;
  font-size: 0.7rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all cubic-bezier(1, -0.34, 0, 0.02) 0.6s;
  @media screen and (max-width: 419px) {
    height: 40px;
  }
}
.headinfo a:hover {
  background: #414047;
  color: white;
}
</style>
