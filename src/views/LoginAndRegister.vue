<template>
  <div class="box">
    <div class="wrap">
      <form>
        <h3 :class="['form_title', { form_title_r: !loginShow }]">
          {{ !loginShow ? 'Registered' : 'Login' }}
        </h3>
        <label v-if="!loginShow" for="nickName">昵 称</label>
        <input
          v-if="!loginShow"
          id="nickName"
          v-model.trim="userInfo.nickName"
          type="text"
        />
        <label for="userName">账 号</label>
        <input id="userName" v-model.trim="userInfo.userName" type="text" />
        <label for="password">密 码</label>
        <input id="password" v-model.trim="userInfo.password" type="password" />
        <button v-if="!loginShow" @click.stop="myreg">注册</button>
        <button v-else @click.stop="mylogin">登录</button>
        <button @click="toggleStatus">
          切换{{ loginShow ? '注册' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  components: {},
  data() {
    return {
      actionPath: '/login',
      loginShow: true,
      userInfo: {
        nickName: '',
        userName: '',
        password: '',
      },
    };
  },
  mounted() { },
  computed: {
    ...mapState(['isLogin', 'baseURL'])
  },
  methods: {
    ...mapMutations(['updataStatus', 'updataUserInfo']),
    async myreg() {
      if (!this.userInfo.nickName || !this.userInfo.userName || !this.userInfo.password) return this.$message.error('请填写必要信息！');
      const url = this.baseURL + '/demo/examination/reg'
      const res = (await this.$axios.post(url, this.userInfo)).data
      if (res.code !== 7) return this.$message.error(res.msg);
      this.$message.success(res.msg);
    },
    async mylogin() {
      if (!this.userInfo.userName || !this.userInfo.password) return this.$message.error('请填写必要信息！');
      const url = this.baseURL + '/demo/examination/login'
      const res = (await this.$axios.post(url, this.userInfo)).data
      if (res.code !== 7) return this.$message.error(res.msg);
      this.$message.success(res.msg);
      sessionStorage.setItem("isLogin", this.userInfo.userName);
      const userInfo = (await this.$axios.post(this.baseURL + '/demo/examination/getUserInfo', this.userInfo)).data.data[0]
      console.log('用户信息为', userInfo)
      this.updataUserInfo(userInfo)
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      this.updataStatus(JSON.parse(sessionStorage.getItem('isLogin')))
      this.router.push('/start');
    },

    toggleStatus() {
      this.loginShow = !this.loginShow
    }
  }
};
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  padding: 1rem;
  height: calc(100vh - 8vh);
  // height: 86vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #fff;
  box-shadow: 0px 0px 2px #627c991a;
  overflow: hidden;
}
.box::after {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(20px);
  box-shadow: inset 0px 3px 0px 3px black;
  content: '';
  background: url(../assets/bg.png) no-repeat;
  background-size: cover;
  transform: perspective(1px) scale(1.1);
}
.wrap {
  padding: 1rem;
  max-width: 455px;
  @media screen and (max-width: 410px) {
    width: 100%;
  }
  form {
    position: relative;
    color: white;
    z-index: 2;
    box-shadow: 6px 8px 11px #00000042;
    padding: 45px 24px;
    background: #fff;
    border-radius: 4px;
    background-repeat: no-repeat;
    .form_title {
      color: #fc9db4;
      text-shadow: 2px 1px 0px #f16083, -1px -1px white;
      margin-bottom: 1rem;
      top: -22%;
      font-size: 2.5rem;
      text-align: center;
      position: absolute;
      width: calc(100% - 48px);
      transition: all 1s;
    }
    .form_title_r {
      color: #fffdfa;
      text-shadow: 4px 3px 0px #ffa0b4, -1px -2px #ffa0b4;
    }
    input {
      margin: 0.4rem 0 1rem;
      outline-color: #fc9db4;
      border-radius: 4px;
      border: none;
      color: #575e5d;
      letter-spacing: 4px;
      width: 100%;
      padding: 10px;
      transition: 0.3s;
      border: 1px solid #e8e8e8;
      font-size: 0.8rem;
      height: 48px;
      padding-left: 16px;
    }
    label {
      display: block;
      position: absolute;
      color: #b2bac2;
      left: 42px;
      padding: 0 10px;
      background: #fff;
      font-size: 15px;
    }
    button {
      margin: 1rem 0 0;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.2s;
      font-family: serif;
      transition: all 0.5s;
      width: 100%;
      padding: 12px;
      font-size: 14px;
      font-weight: 400;
      background: #0066ff;
      border-radius: 4px;
      color: white;
      border: 1px solid #fc9db4;
      background-color: #fbecd1;
      background-image: linear-gradient(90deg, transparent, #ff99b1);
    }
    button:hover {
      opacity: 0.9;
      background-color: #ff99b1;
      background-image: linear-gradient(90deg, #fbecd1, transparent);
      border: 1px solid #fbecd1;
    }
  }
}
</style>
