<template>
  <div class="box">
    <div class="wrap">
      <form>
        <label v-if="!loginShow" for="nickName">昵称</label>
        <input
          v-if="!loginShow"
          id="nickName"
          v-model.trim="userInfo.nickName"
          type="text"
        />
        <label for="userName">账号</label>
        <input id="userName" v-model.trim="userInfo.userName" type="text" />
        <label for="password">密码</label>
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
      this.router.push('/userCenter');
    },

    toggleStatus() {
      this.loginShow = !this.loginShow
    }
  }
};
</script>
<style>
.box {
  width: 100%;
  padding: 1rem;
  height: 88vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://gitee.com/lang-tian/image_upload/raw/master/img/$WV7@6Y_J23X8%603V7G4A24M.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.wrap {
  padding: 1rem;
}
.wrap form {
  position: relative;
  color: white;
  padding: 1.5rem;
  z-index: 2;
  background-color: #1f2845d6;
  box-shadow: 3px 5px 20px 2px #00000040, 0px 0px 20px 1px #ffffff5c;
}
form label {
  display: block;
  position: relative;
  letter-spacing: 10px;
  font-size: 0.8rem;
}

form button {
    margin: 1rem 0;
    cursor: pointer;
    width: 100%;
    font-size: 0.8rem;
    padding: 0.5rem 2rem;
    border: none;
    letter-spacing: 5px;
    border-radius: 8px;
    background-color: #4e5c77;
    color: #ffffff;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 1s;
    font-family: serif;
}
form button:hover {
  background-color: #858eaf;
}
form input {
  min-width: 20vw;
  margin: 0.4rem 0 1rem;
  height: 1.3rem;
  padding-left: 1rem;
  color: white;
  background-color: #505e7b;
  /* outline: none; */
  outline-color: #4e5c77;
  border-radius: 0.2rem;
  border: none;
}
</style>
