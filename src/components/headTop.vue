<template>
  <div>
    <div class="headinfo">
      <div class="head_title">小浪简陋做题</div>
      <div class="rightgroup">
        <router-link to="/examination">上传练习</router-link>
        <router-link to="/record">记录</router-link>
        <router-link to="/userCenter">个人中心</router-link>
        <router-link to="/LoginAndRegister">登录/注册</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "headTop",

  data() {
    return {

    }
  },
}
</script>

<style scoped>
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

.headinfo {
  padding: 0 2rem;
  margin-bottom: 2vh;
  background-color: #f5f7fa;
  box-shadow: 0px 1px 7px #00000033;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
}

.head_title {
  height: 100%;
  color: #336699;
  padding: 0 20px;
  font-weight: bold;
  font-size: 2rem;
  /* padding: 1rem; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.rightgroup {
  height: 100%;
  padding: 0 1rem;
}
.headinfo a {
  float: left;
  padding: 0 1rem;
  text-decoration: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all cubic-bezier(1, -0.34, 0, 0.02) 0.6s;
  color: rgba(0, 0, 0, 0.842);
}
.headinfo a:hover {
  background: #ea7070;
  color: white;
}
</style>
