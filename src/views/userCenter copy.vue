<template>
  <div class="container">
    <div :class="['left', { left_item_show: leftItemShow }]">
      <input
        type="file"
        @change="chooseFile($event)"
        ref="image"
        class="choose_file"
      />
      <div class="infobox" v-if="!leftItemShow">
        <div class="title">用户信息</div>
        <div class="head_image">
          <img
            @click="targetChooseFile"
            :src="
              userInfo.head_image === ''
                ? 'https://gitee.com/lang-tian/image_upload/raw/master/img/image-20220104174230564.png'
                : userInfo.head_image
            "
          />
        </div>
        <div class="info">
          <p class="nickname"><span>昵称：</span>{{ userInfo.nickname }}</p>
          <p class="password"><span>密码：</span>{{ userInfo.password }}</p>
          <div @click="leftItemShow = !leftItemShow" class="change_show_btn">
            {{ leftItemShow ? '显示' : '隐藏' }}用户信息
          </div>
        </div>
      </div>
    </div>
    <div :class="['right', { right_full: leftItemShow }]">
      <div class="record_box">
        <div class="record_title">我的文件</div>
        <div class="record_item_box">
          <div @click="leftItemShow = !leftItemShow" class="change_show_btn">
            {{ leftItemShow ? '显示' : '隐藏' }}用户信息
          </div>
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>文件名称</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in userInfo.testList" :key="item.id">
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  <p>{{ item.dataName }}</p>
                </td>
                <td>
                  <p>{{ item.createTime.split('T')[0] }}</p>
                </td>
                <td>
                  <button @click="testExamin(item.data)" class="examintest">
                    练习
                  </button>
                  <button @click="deleteExamin(item.id)" class="examintest">
                    删除
                  </button>
                  <button
                    @click="
                      changeShared(
                        item.id,
                        item.isShared === 0 ? 1 : 0,
                        item.data
                      )
                    "
                    class="examintest"
                  >
                    {{ !item.isShared ? '共享' : '不共享' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapState(['userInfo', 'baseURL'])
  },
  created() {
    //  从缓存中获取数据
    if (JSON.stringify(this.userInfo) === '{}') {
      this.updataUserInfo(JSON.parse(sessionStorage.getItem('userInfo')))
      // console.log(this.userInfo)
    }
  },
  data() {
    return {
      leftItemShow: false
    };
  },
  mounted() { },
  methods: {
    ...mapMutations(['updataUserInfo', 'setNowTestExamin']),
    // 练习
    testExamin(data) {
      // console.log(JSON.parse(data))
      this.setNowTestExamin(JSON.parse(data))
      this.router.push('/examination')
    },
    // 删除练习
    async deleteExamin(id) {
      const res = (await this.$axios.post(this.baseURL + '/demo/examination/deleteExamin', { id })).data
      console.log(res)
      if (res.code === -1) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getUserInfo()
    },
    // 更改分享状态
    async changeShared(id, isShared, data) {
      const res = (await this.$axios.post(this.baseURL + '/demo/examination/changeShared', { id, isShared, data })).data
      // console.log(res)
      if (res.code === -1) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getUserInfo()
    },
    // 触发文件选择
    targetChooseFile() {
      const chooseFile = this.$refs.image
      chooseFile.click()
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
    // 选择文件
    chooseFile(e) {
      const file = e.target.files[0]
      console.log('文件是', file)
      if (!file) return this.$message.error('选取文件失败！')
      if (file.size > 1100000) return this.$message.error('请选择小于1M的图片')
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') return this.$message.error('只支持png、jpg的图片')
      const formData = new FormData();
      formData.append("file", file);
      formData.append('username', this.userInfo.username)
      this.uploadFile(formData)
    },
    // 上传文件并获取数据
    async uploadFile(formData) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const res = (await this.$axios.post(this.baseURL + '/demo/examination/uploadimage', formData, config)).data
      // console.log(res)
      if (res.code !== 7) return this.$message.error('上传图片失败')
      this.getUserInfo()
    },
  }
};
</script>
<style  scoped lang="scss">
.container {
  height: calc(100vh - 8vh);
  display: flex;
  justify-content: space-between;
  justify-items: flex-start;
  position: relative;
  overflow: hidden;
  // flex-wrap: wrap;
}
.container::after {
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
.left_item_show {
  position: absolute;
  transform: scale(0) !important;
}
.change_show_btn {
  cursor: pointer;
  text-align: center;
}
.left {
  // transition: all 1s;
  width: 20vw;
  transform: scale(1);
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  background-size: 400% 400%;
  background-position: 0 0;
  color: white;
  background-color: #ffffff24;
}
@keyframes left_an {
  to {
    box-shadow: 3px 0px 20px 1px rgba(0, 0, 0, 14%);
    background-color: #ea5455;
    background-position: 100% 100%;
    background-image: linear-gradient(135deg, #feb692 10%, transparent 100%);
  }
}
.choose_file {
  width: 0;
}
.right {
  transition: all 1s;
  width: 75vw;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
  background-color: #ffffff24;
}
.right_full {
  width: 100% !important;
}
.infobox {
  position: relative;
  width: 90%;
}
.infobox .title {
  color: white;
  position: absolute;
  /* top: -160px; */
  letter-spacing: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: cursive;
  left: 50%;
  transform: translate(-50%, -172px);
}
.infobox .info {
  background-color: #ffffff9c;
  box-shadow: 3px 3px 8px #464e714a;
  border-radius: 4px;
  z-index: 1;
  padding: 2rem 1rem;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  font-size: 14px;
  top: 50%;
  color: #121212;
}
.infobox .info p {
  margin: 10px;
  width: 100%;
  font-family: monospace;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head_image {
  background-color: #becbce;
  position: absolute;
  /* top: -40%; */
  left: 50%;
  transform: translate(-50%, -68%);
  overflow: hidden;
  z-index: 2;
  font-size: 80px;
  border-radius: 50%;
  border: 3px solid #d1e3ff70;
  box-shadow: 0px 5px 0px 0px #409eff24;
  border-radius: 30% 70% 30% 70% / 53% 58% 42% 47%;
  animation: head_image 5s infinite alternate-reverse;
}

@keyframes head_image {
  30% {
    border-radius: 52% 48% 72% 28% / 23% 60% 40% 77%;
  }
  60% {
    border-radius: 32% 68% 39% 61% / 54% 32% 68% 46%;
  }
  to {
    border-radius: 57% 43% 31% 69% / 64% 52% 48% 36%;
  }
}
.head_image img {
  box-shadow: 1px 1px 9px #1d1b1b, inset 1px 1px 1px black;
  display: block;
  width: 100%;
  transform: scale(1.3);
  cursor: pointer;
}
.head_image img:hover {
  transform: rotate(666turn);
  transition: all 59s cubic-bezier(0.34, 0, 0.84, 1) 1s;
}

.record_box {
  /* background-color: rgb(54 53 59); */
  padding: 4rem;
  overflow-y: auto;
  width: 80%;
  box-sizing: border-box;
  height: 80vh;
  @media screen and (max-width: 420px) {
    padding: 0rem;
  }
}
.record_title {
  position: relative;
  font-size: 0.7rem;
  background-color: #ecf5ff9e;
  margin-bottom: 1rem;
  color: #8f8f8f;
  padding: 0.8rem;
  border-radius: 8px;
  letter-spacing: 4px;
  border-radius: 10px;
  border-left: 18px solid #ffc71c;
  z-index: 2;
  -webkit-clip-path: polygon(
    0px 0,
    calc(100% - 20px) 0,
    100% 20px,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    20px 100%,
    0 calc(100% - 0px),
    0 20px
  ) !important;
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
  box-shadow: inset 1px 0px 0px #0000001f;
}
.right table {
  border-spacing: 10px 10px;
  margin: 0 auto;
  overflow-y: auto;
  @media screen and (max-width: 450px) {
    height: 60vh;
  }
}
.right table tbody {
  margin: 10px;
}
.right table tr {
  margin: 1rem 0;
  border-radius: 20px;
}
.right table th {
  letter-spacing: 3px;
}
.right table p {
  margin: 0.3rem;
}
.right table th {
  padding: 1rem 0;
}

.right table th,
.right table td,
.change_show_btn {
  transition: all 1s;
  text-align: center;
  font-size: 14px;
  font-family: serif;
  font-weight: bold;
  color: #727272;
  position: relative;
  background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 50px;
  background: #fff6;
  box-shadow: 1px 1px #00000024, -1px -1px #ffffffb5;
  z-index: 1;
  @media screen and (max-width: 450px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;
  }
}
.right table th::before,
.right table td::before,
.change_show_btn::before,
.head_image::before {
  content: '';
  position: absolute;
  left: -1px;
  right: -1px;
  top: -1px;
  bottom: -1px;
  background-size: 400%;
  border-radius: 55px;
  filter: blur(15px);
  background: #fff6;
  z-index: -1;
}
@keyframes btn_move {
  to {
    background-position: -400% 0;
  }
}
.change_show_btn {
  padding: 0.5rem;
}
thead {
  @media screen and (max-width: 450px) {
    display: none;
  }
}
.right table th:hover,
.right table td:hover,
.change_show_btn:hover,
.right table th:hover::before,
.right table td:hover::before,
.change_show_btn:hover::before,
.head_image:hover:before {
  background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  color: white;
  animation: btn_move 8s infinite;
}
.right table th:nth-child(1),
.right table td:nth-child(1) {
  max-width: 5rem;
  min-width: 4rem;
  @media screen and (max-width: 450px) {
    max-width: 100%;
    min-width: 100%;
    padding: 0.5rem;
  }
}
.examintest {
  border: none;
  outline: none;
  margin: 4px 10px;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  transition: all 1s;
  border-radius: 10px;
  background-image: linear-gradient(
    150deg,
    #aab6ba,
    #cedcdf 21%,
    #6e777a,
    #566162
  );
  color: white;
  box-shadow: 3px 6px 7px #00000059, inset -4px -2px 4px 0px #02020247;
}
.examintest:nth-child(1) {
  background-image: linear-gradient(150deg, #8ddff5, #0d82a9);
}
.examintest:nth-child(1):hover {
  background-image: linear-gradient(-51deg, #8ddff5, #0d82a9);
}
.examintest:nth-child(2) {
  background-image: linear-gradient(150deg, #f56c6c, #990505);
}
.examintest:nth-child(2):hover {
  background-image: linear-gradient(-51deg, #f56c6c, #990505);
}
.examintest:nth-child(3) {
  background-image: linear-gradient(150deg, #6cf5d5, #379b06);
}
.examintest:nth-child(3):hover {
  background-image: linear-gradient(
    -51deg,
    #6cf5d5,
    #bff9d9 21%,
    #319361,
    #379b06
  );
}
.examintest:hover {
  text-shadow: -1px -1px 0px #000000, 1px 1px 0px #d0dae8;
  box-shadow: inset 4px 4px 7px #00000045, inset 0px 0px 0px white,
    1px 1px 0px 0px #ebeaea99, 1px 1px 0px white, inset -1px -1px 7px #00000082;
}
</style>
