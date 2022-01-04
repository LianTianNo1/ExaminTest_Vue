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
      }
    };
  },
  mounted() { },
  methods: {
    myreg() {
      const url = 'http://127.0.0.1:3000/demo/examination/reg'
      this.$axios.post(url, this.userInfo).then(data => console.log(data))
      console.log(this.userInfo)
    },
    async mylogin() {
      const url = 'http://127.0.0.1:3000/demo/examination/login'
      const res = (await this.$axios.post(url, this.userInfo)).data
      if (res.code !== 7) return
      this.router.push('/userCenter')
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
  padding: 4rem;
  z-index: 2;
  background-color: #ffffff30;
  box-shadow: 3px 5px 20px 2px #00000040;
}

form label {
  display: block;
  position: relative;
  letter-spacing: 10px;
}
/* form label::after {
  content: '';
  display: block;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#50c1e9),
    to(#ff5f5f)
  );
  background-image: linear-gradient(to right, #50c1e9, #ff5f5f);
  position: absolute;
  top: 120%;
  width: 100%;
  height: 5px;
  -webkit-box-shadow: 1px 1px 1px yellow;
  box-shadow: 2px 2px 6px 0px yellow;
} */
form button {
  margin: 1rem 0;
  cursor: pointer;
  width: 100%;
  font-size: 27px;
  padding: 1rem 2rem;
  border: none;
  letter-spacing: 5px;
  background-color: #ff585d;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;
}
form button:hover {
  background-color: #41b6e6;
}
form input {
  min-width: 20vw;
  margin: 1rem 0 2rem;
  height: 2rem;
  padding-left: 1rem;
  outline-color: #ff585d;
  border-radius: 2rem;
}
</style>
