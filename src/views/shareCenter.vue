<template>
  <div>
    <div class="sharedbox">
      <div class="inputGroup">
        <input
          v-model.trim="searchval"
          type="text"
          @keyup.enter="searchExamin"
          placeholder="请输入需要搜索内容ヾ(●´∀｀●)"
        />
        <button class="el-icon-search" @click="searchExamin">搜索</button>
      </div>
      <ul v-show="!isSearch" class="shared_result">
        <li v-for="(item, index) in searchResult" :key="item.id">
          <p>{{ item.dataName }}</p>
          <div class="taggroup">
            <span>{{ item.tag ? item.tag : '暂无标签' }}</span>
          </div>
          <strong>
            分享者：{{ item.nickname }}<br />
            创建日期：{{ item.createTime.split('T')[0] }}
          </strong>
          <div class="buttongroup">
            <button @click="collectExamin(item.data, item.dataName, item.tag)">
              收藏
            </button>
            <button @click="testExamin(item.data)" :b="index">练习</button>
          </div>
        </li>
      </ul>
      <ul v-show="isSearch" class="shared_result">
        <li v-for="(item, index) in userInfo['shareList']" :key="item.id">
          <p>{{ item.dataName }}</p>
          <div class="taggroup">
            <span>{{ item.tag ? item.tag : '暂无标签' }}</span>
          </div>
          <strong>
            分享者：{{ item.nickname }}<br />
            创建日期：{{ item.createTime.split('T')[0] }}
          </strong>
          <div class="buttongroup">
            <button @click="collectExamin(item.data, item.dataName, item.tag)">
              收藏
            </button>
            <button @click="testExamin(item.data)" :b="index">练习</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'shareCenter',
  computed: {
    ...mapState(['userInfo', 'baseURL'])
  },
  data() {
    return {
      searchval: '',
      isSearch: true,
      // 搜索结果
      searchResult: [],
      sharedExamin: []
    }
  },
  created() {
    //  从缓存中获取数据
    if (JSON.stringify(this.userInfo) === '{}') {
      this.updataUserInfo(JSON.parse(sessionStorage.getItem('userInfo')))
      // console.log(this.userInfo)
    }
  },
  watch: {
    searchval: {
      handler(val) {
        if (val === '') {
          this.isSearch = true
        }
      },
    }
  },
  methods: {
    ...mapMutations(['setNowTestExamin', 'updataUserInfo']),
    // 练习
    testExamin(data) {
      // console.log(JSON.parse(data))
      this.setNowTestExamin(JSON.parse(data))
      this.router.push('/examination')
    },
    // 收藏练习
    async collectExamin(data, dataName, tag) {
      console.log(this.userInfo)
      const res = (await this.$axios.post(this.baseURL + '/demo/examination/addExamin', {
        userName: this.userInfo.username,
        data,
        dataName,
        tag
      })).data
      console.log(res)
      if (res.code === -1) {
        return this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
      // 获取用户信息
      this.getUserInfo()
    },
    // 获取用户信息
    async getUserInfo() {
      const params = {
        userName: this.userInfo.username
      }
      const res = (await this.$axios.post(this.baseURL + '/demo/examination/getUserInfo', params)).data
      console.log('用户信息', res)
      if (res.code !== 7) return this.$message.error('更新信息失败')
      this.updataUserInfo(res.data[0])
      sessionStorage.setItem("userInfo", JSON.stringify(res.data[0]));
    },
    // 搜索练习
    async searchExamin() {
      if (this.searchval === '') return this.$message.error('请输入搜索的内容！')
      const res = (await this.$axios.post(this.baseURL + '/demo/examination/searchExamin', { dataName: this.searchval })).data
      console.log(res)
      if (res.code === -1) {
        this.searchResult = res.data
        return this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
      this.searchResult = res.data
      this.isSearch = false
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
.sharedbox {
  height: 92vh;
  position: relative;
  padding: 50px;
  overflow: hidden;
}
.sharedbox::after {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(20px);
  box-shadow: inset 0px 3px 0px 3px black;
  content: '';
  background: url(../assets/bg.png) no-repeat;
  background-size: cover;
  transform: perspective(1px) scale(1.1);
  z-index: -1;
}
.inputGroup {
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  input {
    margin-right: 15px;
    min-width: 230px;
    width: 100%;
    background-color: #ffffff;
    padding: 1rem 1rem;
    outline: none;
    outline-color: transparent;
    border: none;
    border-radius: 9px;
    box-shadow: 4px 4px 10px #00000080, inset 0px 4px 8px #bbc8cb,
      inset 0px -4px 8px #b4c1c4, 0px 0px 20px 9px #ffffff14,
      inset 1px 0px 1px black, inset -1px 0px 1px black;
    background-image: linear-gradient(
      150deg,
      #fafafa,
      #ffffff 21%,
      #c4d2d5,
      #e9fbff
    );
    /* text-shadow: 1px 1px 0px black,-1px -1px 0px black; */
    color: #626c6e;
    letter-spacing: 3px;
    border-left: 20px solid #eb4d4b;
    border-right: 20px solid #00a8ff;
  }
  button {
    width: 72px;
    border-radius: 4px;
    color: white;
    outline: none;
    border: none;
    box-shadow: 2px 3px 4px #7e7e7e, inset 2px 2px 8px white;
    display: flex;
    background-image: linear-gradient(
      150deg,
      #eb4d4b,
      #f27474 17%,
      #c6cbc2,
      #00a8ff
    );
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0.5rem;
  }
  @media screen and (max-width: 450px) {
  }
}
ul.shared_result {
  margin-top: 30px;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: 60vh;
  overflow-y: auto;
  align-items: flex-start;
  li:hover {
    transform: translate(0, -10px);
    box-shadow: 6px 16px 17px 0px #4a4a4a9e;
  }
  li {
    transition: all 0.5s;
    @media screen and (max-width: 450px) {
      min-width: 92%;
    }
    min-width: 285px;
    margin: 10px;
    color: white;
    box-shadow: 2px 2px 8px #00000021, inset 1px 0px 0px 0px #02020242;
    padding: 1rem;
    border-left: 8px solid #ff030082;
    border-radius: 0 4px 4px 0;
    background-color: #ffffff82;
    width: 20%;
    clip-path: polygon(
      0px 0,
      calc(100% - 20px) 0,
      100% 20px,
      100% calc(100% - 20px),
      calc(100% - 20px) 100%,
      20px 100%,
      0 calc(100% - 0px),
      0 20px
    ) !important;
    transform: scale(0.9);
    p {
      font-weight: bold;
      letter-spacing: 1px;
      font-size: 0.7rem;
      padding: 0.5rem;
      font-weight: bold;
      color: #cddadd;
      background-color: #99a5a8;
      border-radius: 10px;
      margin-bottom: 0px;
    }
    strong {
      font-size: 0.6rem;
      display: block;
      padding: 0.4rem;
      margin: 10px 0;
      color: #cddadd;
      background-color: #99a5a8;
      border-radius: 10px;
    }
    span {
      padding: 5px;
      box-shadow: 2px 2px 5px #878787, inset 0px 0px 0px 0px #ffffff;
      font-size: 0.6rem;
      background-image: linear-gradient(
        25deg,
        #d9027a,
        #b9519b,
        #8b73bd,
        #158ce1
      );
      border-radius: 4px;
      display: block;
      padding: 0.4rem 1rem 0.4rem 0.5rem;
      margin: 0.2rem;
      clip-path: polygon(
        0px 0,
        calc(100% - 20px) 0,
        100% 20px,
        100% calc(100% - 20px),
        calc(100% - 20px) 100%,
        20px 100%,
        0 calc(100% - 0px),
        0 20px
      ) !important;
    }
    button {
      padding: 0.5rem 1rem;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      border: none;
      position: relative;
      outline: none;
      cursor: pointer;

      background-image: linear-gradient(
        90deg,
        #03a9f4,
        #f441a5,
        #ffeb3b,
        #03a9f4
      );
      background-size: 400%;
      border-radius: 50px;
      color: white;
      box-shadow: 6px 4px 7px #00000042, inset -4px -3px 4px 0px #02020285,
        1px 1px 0px 0px #ffffff6b;
      transition: all 0.5s;
    }
    button::before {
      content: '';
      position: absolute;
      left: -1px;
      right: -1px;
      top: -1px;
      bottom: -1px;
      background-image: linear-gradient(
        90deg,
        #03a9f4,
        #f441a5,
        #ffeb3b,
        #03a9f4
      );
      background-size: 400%;
      border-radius: 55px;
      filter: blur(15px);
      z-index: -1;
    }
    .buttongroup button:hover {
      background-image: linear-gradient(
        318deg,
        #56677a,
        #cedcdf 8%,
        #6e777a,
        #566162
      );
      color: white;
      box-shadow: -1px 1px 7px #00000042, inset 3px 3px 4px 0px #02020285,
        1px 1px 0px 0px #fffffff5, inset -3px -3px 7px #00000042;
    }
  }
  @keyframes btn_move {
    to {
      background-position: -400% 0;
    }
  }
}
.taggroup {
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0;
}

.buttongroup {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
