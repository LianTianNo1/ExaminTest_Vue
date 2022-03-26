<template>
  <div class="box">
    <div class="animation">
      <!-- <img src="../assets/bg1_0.png" /> -->
      <div class="cat1"></div>
      <div class="cat2"></div>
    </div>
    <ul class="bubblue">
      <li style="--i: 7; --k: 2; --j: 2s"></li>
      <li style="--i: 9; --k: 4; --j: 8s"></li>
      <li style="--i: 8; --k: 1; --j: 1s"></li>
      <li style="--i: 3; --k: 5; --j: 4s"></li>
      <li style="--i: 5; --k: 7; --j: 7s"></li>
      <li style="--i: 4; --k: 8; --j: 5s"></li>
      <li style="--i: 10; --k: 6; --j: 6s"></li>
      <li style="--i: 6; --k: 3; --j: 3s"></li>
    </ul>
    <div class="ball"></div>
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
        <button v-if="!loginShow" @click.stop="myreg"><span>注册</span></button>
        <button v-else @click.stop="mylogin"><span>登录</span></button>
        <button @click="toggleStatus">
          <span> 切换{{ loginShow ? '注册' : '登录' }} </span>
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
      if (this.userInfo.userName.length < 6 || this.userInfo.userName.length > 18) return this.$message.error('用户账号必须在6-18位');
      if (this.userInfo.password.length < 6 || this.userInfo.password.length > 18) return this.$message.error('用户密码必须在6-18位');
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
      sessionStorage.setItem("isLogin", JSON.stringify(this.userInfo.userName));
      const userInfo = (await this.$axios.post(this.baseURL + '/demo/examination/getUserInfo', this.userInfo)).data.data[0]
      // console.log('用户信息为', userInfo)
      this.updataUserInfo(userInfo)
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      // console.log(sessionStorage.getItem('isLogin'))
      this.updataStatus(JSON.parse(sessionStorage.getItem('isLogin') || ""))
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
  height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #fff;
  background: #8ac6d1;
  box-shadow: 0px 0px 2px #627c991a;
  overflow: hidden;
  animation: box_an2 5s cubic-bezier(0.18, 0.72, 0.6, 0.72) 1s forwards;

  @media screen and (max-width: 420px) {
    height: 90vh;
  }
}
@keyframes box_an2 {
  10% {
    background: #8ac6d1;
  }
  20% {
    background: #ffb6b9;
  }

  30% {
    background: #bbded6;
  }
  40% {
    background: #a696c8;
  }
  50% {
    background: #ff6768;
  }
  60% {
    background: #41b6e6;
  }
  70% {
    background: #ff585d;
  }
  80% {
    background: #d9d9f3;
  }
  99% {
    background: #9dd3a8;
  }

  100% {
    background: #9dd3a8;
  }
}
.box::after {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(20px);
  content: '';
  animation: box_an 0.1s linear 5.7s forwards;
}
@keyframes box_an {
  to {
    background: url(../assets/bg.png) no-repeat;
    background-size: cover;
    transform: perspective(1px) scale(1.1);
    box-shadow: inset 0px 3px 0px 3px black;
  }
}
.ball {
  position: absolute;
  top: 0;
  left: 30%;
  background-color: #fff;
  padding: 1rem;
  box-shadow: inset 4px 4px 5px #ffffff8f, 1px 1px 4px #4d4d4d9c,
    inset -6px -4px 6px #00000014;
  border-radius: 50%;
  background-image: linear-gradient(318deg, #bdbdbd, transparent);
  z-index: 1;
  transform: translate(0%, -100%);
  // animation: ball_an 25s cubic-bezier(0.18, 0.72, 0.6, 0.72) 1s infinite;
  animation: ball_an 5s cubic-bezier(0.18, 0.72, 0.6, 0.72) 1s forwards;
}
@keyframes ball_an {
  9%,
  19%,
  29%,
  39%,
  49%,
  59%,
  69%,
  79%,
  89% {
    filter: blur(1px);
    transform: scale(1);
    border-radius: 50%;
  }
  1%,
  11%,
  21%,
  31%,
  41%,
  51%,
  61%,
  71%,
  81%,
  91% {
    border-radius: 50%;
  }
  10% {
    top: 30%;
    left: 0%;
    border-radius: 4% 96% 96% 4% / 49% 52% 48% 51%;
    box-shadow: inset 3px 4px 5px #ebe8e88f, 2px 1px 4px #6d6c6c9c;
  }
  20% {
    filter: blur(0px);
    top: 100%;
    left: 30%;
    border-radius: 50% 50% 49% 51% / 88% 92% 8% 12%;
    transform: translate(0%, -100%) scale(1.2);
    box-shadow: inset 3px 4px 5px #ebe8e88f, 2px 1px 4px #6d6c6c9c;
  }

  30% {
    top: 60%;
    left: 100%;
    border-radius: 97% 3% 2% 98% / 49% 52% 48% 51%;
    transform: translate(-100%, 0%) scale(1.2);
    box-shadow: inset 3px 4px 5px #ebe8e88f, 2px 1px 4px #6d6c6c9c;
  }
  40% {
    top: 0%;
    left: 56%;
    border-radius: 50% 50% 49% 51% / 7% 9% 91% 93%;
    transform: scale(1.2);
    box-shadow: inset 3px 4px 5px #ebe8e88f, 2px 1px 4px #6d6c6c9c;
  }
  50% {
    top: 40%;
    left: 0%;
    border-radius: 4% 96% 96% 4% / 49% 52% 48% 51%;
    transform: scale(1.2);
    box-shadow: inset 3px 4px 5px #ebe8e88f, 2px 1px 4px #6d6c6c9c;
  }
  60% {
    filter: blur(0px);
    top: 100%;
    left: 60%;
    border-radius: 50% 50% 49% 51% / 88% 92% 8% 12%;
    transform: translate(0%, -100%) scale(1.2);
    box-shadow: inset 3px 4px 5px #ebe8e88f, 2px 1px 4px #6d6c6c9c;
  }
  70% {
    filter: blur(0px);
    top: 0%;
    left: 50%;
    border-radius: 50% 50% 49% 51% / 7% 9% 91% 93%;
    transform: translate(-50%, -50%) scale(1.2);
  }
  80% {
    filter: blur(0px);
    top: 100%;
    left: 40%;
    border-radius: 50% 50% 49% 51% / 88% 92% 8% 12%;
    transform: translate(-50%, -100%) scale(1.2);
  }
  99% {
    filter: blur(0px);
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: inset 4px 2px 5px #eeebeb8f, 1px 2px 5px #6665659c;
    opacity: 1;
  }

  100% {
    filter: blur(0px);
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
.animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    transform: perspective(1px) scale(1.1);
    z-index: 2;
    background-repeat: no-repeat;
    background-size: cover;
  }
  @keyframes cat1_an {
    to {
      transform: perspective(1px) scale(1.1);
    }
  }
  .cat1 {
    filter: drop-shadow(2px 4px 6px #ff631482);
    transform: perspective(1px) scale(1.1) translate(0, -100%);
    animation: cat1_an 1s cubic-bezier(1, 0.65, 0, 1.04) 8.7s forwards;
    background-image: url(../assets/bg1_1.png);
  }
  @keyframes cat2_an {
    to {
      top: 0;
    }
  }
  .cat2 {
    top: 100%;
    animation: cat2_an 1s cubic-bezier(0.12, 1.4, 1, 1) 9.7s forwards;
    background-image: url(../assets/bg1_2.png);
    filter: drop-shadow(2px 4px 6px #6d6d6d82);
  }
}
@keyframes bubblue_an {
  to {
    opacity: 1;
  }
}
ul.bubblue {
  position: absolute;
  display: flex;
  width: 100%;
  opacity: 0;
  height: 100%;
  justify-content: space-evenly;
  list-style: none;
  z-index: 1;
  animation: bubblue_an 0.1s 6s forwards;
  li {
    position: absolute;
    bottom: 0;
    left: calc(10% * var(--k));
    padding: 1rem;
    transform: scale(calc(var(--i) / 10)) translate(0, 100%);
    // box-shadow: -1px -1px #fff, inset -1px -1px 7px #fff, 2px 2px 6px #574f4f40,
    //   inset -10px -8px 20px #ffffff70, inset 4px 2px 9px #ffffff80,
    //   inset -6px -7px 20px #00000040;
    box-shadow: -1px -1px #fff, inset -1px -1px 7px #fff, 2px 2px 6px #fb729945,
      inset -10px -8px 20px #fea4b6a3, inset 4px 2px 9px #ffffff,
      inset -6px -7px 20px #00000040;
    border-radius: 29% 71% 48% 52% / 64% 56% 44% 36%;
    animation: bubble_move cubic-bezier(0.57, -0.21, 0.24, 0.85) 5s
      calc(var(--j)) infinite;
  }
  @keyframes bubble_move {
    20% {
      border-radius: 23% 77% 30% 70% / 75% 32% 68% 25%;
    }

    50% {
      border-radius: 37% 63% 55% 45% / 42% 66% 34% 58%;
    }

    70% {
      border-radius: 43% 57% 63% 37% / 42% 44% 56% 58%;
    }

    90% {
      border-radius: 57% 43% 64% 36% / 33% 60% 40% 67%;
    }
    to {
      bottom: 100%;
      border-radius: 49% 51% 49% 51% / 73% 71% 29% 27%;
      transform: scale(calc(var(--i) / 4)) translate(0, 0);
    }
  }
}

.wrap {
  transform: scale(0);
  max-width: 370px;
  border-radius: 50%;
  @media screen and (max-width: 410px) {
    width: 100%;
  }
  // max-width: 0px;
  background: white;
  animation: wrap_an 1s 5.7s forwards;
  z-index: 1;
  @keyframes wrap_an {
    to {
      transform: scale(1);
      border-radius: 4px;
    }
  }
  form {
    animation: form_an 1s cubic-bezier(1, 0.32, 0, 4.56) 6.7s forwards;
    @keyframes form_an {
      to {
        padding: 45px 24px;
        opacity: 1;
      }
    }
    position: relative;
    color: white;
    background: white;
    z-index: 2;
    box-shadow: 6px 8px 11px #00000042;
    opacity: 0;
    border-radius: 4px;
    background-repeat: no-repeat;
    .form_title {
      color: #fc9db4;
      text-shadow: 2px 1px 0px #f16083, -1px -1px white;
      margin-bottom: 1rem;
      font-size: 2.5rem;
      text-align: center;
      top: 0%;
      position: absolute;
      width: calc(100% - 48px);
      transition: all 1s;
      opacity: 0;
      animation: form_title_an 1s 7.7s forwards;
      @keyframes form_title_an {
        to {
          opacity: 1;
          top: -22%;
        }
      }
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
      position: relative;
      margin: 1rem 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 12px;
      font-size: 14px;
      border: none;
      cursor: pointer;
      background: linear-gradient(180deg, #f06d92 0%, #fb7299 100%);
      color: #fff;
      border-radius: 5px;
      font-family: 'Lato', sans-serif;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: inset 2px 2px 2px 0px #ffffff80, 7px 7px 20px 0px #0000001a,
        4px 4px 5px 0px #0000001a;
      outline: none;
    }
    button:before,
    button:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      background: #fb7299;
      box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003,
        4px 4px 5px 0px #0002;
      transition: 400ms ease all;
    }
    button:after {
      right: inherit;
      top: inherit;
      left: 0;
      bottom: 0;
    }
    button:hover:before,
    button:hover:after {
      width: 100%;
      transition: 800ms ease all;
    }
    button:hover {
      color: #fb7299;
      background: transparent;
      box-shadow: none;
    }
  }
}
</style>
