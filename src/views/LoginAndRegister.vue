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
<style scoped lang="scss">
.box {
  width: 100%;
  padding: 1rem;
  height: 86vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 10px solid #cbd9dc;
  box-shadow: 6px 8px 7px #00000042, inset 5px 5px 8px 0px #02020285,
    inset -2px -2px 5px 1px #5c5b5b, 3px 3px 20px #2c2b2b52;
  background-image: linear-gradient(
    150deg,
    #eb3b3b,
    #934fc3 21%,
    #86e0ff,
    #0c9dce
  );
  background-size: 400% 400%;
  animation: bgmove 6s infinite alternate;
}
@keyframes bgmove {
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 50% 50%;
  }
  75% {
    background-position: 100% 100%;
  }
  to {
    background-position: 0% 100%;
  }
}
.wrap {
  padding: 1rem;
  form {
    position: relative;
    color: white;
    padding: 1.5rem;
    z-index: 2;
    /* background-color: #1f2845d6; */
    /* box-shadow: 3px 5px 20px 2px #00000040, 0px 0px 20px 1px #ffffff5c; */
    border: 10px solid #cbd9dc;
    box-shadow: 6px 8px 7px #00000042, inset 5px 5px 8px 0px #02020285,
      inset -2px -2px 5px 1px #5c5b5b, 3px 3px 20px #2c2b2b52;
    background-image: linear-gradient(
      150deg,
      #56677a,
      #cedcdf 21%,
      #6e777a,
      #566162
    );
    input {
      min-width: 20vw;
      margin: 0.4rem 0 1rem;
      /* height: 1.3rem; */
      padding-left: 1rem;
      color: white;
      padding: 0.5rem 1rem;
      font-size: 0.7rem;
      /* outline: none; */
      outline-color: #4e5c77;
      border-radius: 0.2rem;
      border: none;
      box-shadow: 1px 1px 6px #ffffff, inset 3px 3px 9px 0px #00000070;
      text-shadow: 1px 1px 0px #788082, 2px 2px 0px #565e61, 3px 3px 0px #5d6769,
        -1px -1px 0px white;
      color: #cddadd;
      letter-spacing: 4px;
      background-color: #99a5a8;
      @media screen and (max-width: 450px) {
        text-shadow: 1px 1px 0px #788082;
      }
    }
    label {
      display: block;
      position: relative;
      letter-spacing: 10px;
      font-size: 0.8rem;
    }
    button {
      margin: 1rem 0;
      cursor: pointer;
      width: 100%;
      font-size: 0.8rem;
      padding: 0.5rem 2rem;
      border: none;
      letter-spacing: 5px;
      border-radius: 8px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s;
      font-family: serif;
      background-image: linear-gradient(
        150deg,
        #56677a,
        #cedcdf 1%,
        #6e777a,
        #566162
      );
      color: white;
      box-shadow: 6px 4px 7px #00000042, inset -4px -3px 4px 0px #02020285,
        1px 1px 0px 0px #ffffff6b;
      transition: all 0.5s;
    }
    button:hover {
      background-image: linear-gradient(
        318deg,
        #56677a,
        #cedcdf 1%,
        #6e777a,
        #566162
      );
      color: white;
      box-shadow: -1px 1px 7px #00000042, inset 3px 3px 4px 0px #02020285,
        1px 1px 0px 0px #fffffff5, inset -3px -3px 7px #00000042;
    }
  }
}
</style>
