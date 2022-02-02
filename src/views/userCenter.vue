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
  /* background-color: white; */
  height: 86vh;
  display: flex;
  justify-content: space-between;
  justify-items: flex-start;
}
.left_item_show {
  width: 0 !important;
  min-width: 0px !important;
  padding: 0 !important;
  border: none !important;
}
.change_show_btn {
  cursor: pointer;
  text-align: center;
}
.left {
  transition: all 1s;
  width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  /* animation: left_an 3s infinite alternate; */
  background-size: 400% 400%;
  background-position: 0 0;
  color: white;
  /* background-image: linear-gradient(289deg, #515056 10%, #333238 100%);
  box-shadow: 6px 8px 7px #00000042, inset 3px -1px 4px 0px #02020285,
    -1px 1px 3px 1px #ffffff; */
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
  box-shadow: -3px 0px 20px 1px rgba(0, 0, 0, 14%);
  width: 78vw;
  // background-image: url(https://gitee.com/lang-tian/image_upload/raw/master/img/$WV7@6Y_J23X8%603V7G4A24M.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
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
  background-color: #333238;
  /* box-shadow: 1px 1px 1px white; */
  box-shadow: 3px 3px 6px #464e71, inset 5px 5px 9px 0px #00000070;
  border-radius: 2% 2% 0 0;
  z-index: 1;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  font-size: 0.7rem;
  top: 50%;
  color: #f7f7f8;
  box-shadow: 0px 0px 7px #00000042, inset 8px 7px 8px 0px #020202a1,
    inset -2px -2px 5px 1px #5c5b5b, 3px 3px 20px #35323200;
  background-image: linear-gradient(
    150deg,
    #90a1b3,
    #cedcdf 21%,
    #909ea3,
    #6e7d7e
  );
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
  border: 20px solid #becbce;
  box-shadow: 1px 17px 8px 0px #757575, inset 0px 0px 18px white,
    0px 3px 0px 1px #a7b4b7, 0px 2px 0px 2px white, 0px 3px 0px 4px #afbec5,
    0px 6px 0px 4px #8b9598;
}
.head_image img {
  box-shadow: 1px 1px 9px rgb(29, 27, 27), inset 1px 1px 1px black;
  display: block;
  width: 2em;
  height: 2em;
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
  font-size: 1rem;
  font-weight: bold;
  background-color: #505c76;
  margin-bottom: 1rem;
  /* background-image: linear-gradient(135deg, #fff886 10%, #f072b6 100%); */
  background-image: linear-gradient(135deg, #fff6b7 10%, #f6416c 100%);
  /* background-image: linear-gradient(25deg, #f80091, #d262b2, #9d89d4, #00a7f7); */
  box-shadow: 1px 1px 7px 0px rgba(0, 0, 0, 27%);
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  font-family: serif;
  border-radius: 20px;
  letter-spacing: 4px;
  box-shadow: 2px 2px 4px #0000004d, inset 2px 2px 6px white,
    inset -2px -2px 6px #0000005e;
  z-index: 2;
  @media screen and (max-width: 420px) {
    background-image: linear-gradient(135deg, #798997 10%, #cbd9dc 100%);
  }
}
.record_title::before {
  @media screen and (max-width: 420px) {
    display: none;
  }
  content: '';
  display: block;
  position: absolute;
  right: -0.5rem;
  left: -0.5rem;
  top: -0.5rem;
  border-radius: 20px;
  bottom: -0.5rem;
  z-index: -2;
  transition: all 1s;
  background-color: #cbd9dc;
  background-image: linear-gradient(135deg, transparent 10%, #586364 100%);
  box-shadow: 1px 1px 1px black, -1px -1px 1px white;
  /* background-color: #81ffef;
  background-image: linear-gradient(135deg, transparent 10%, #f067b4 100%); */
}
.record_title:hover::before {
  background-color: #586364;
  background-image: linear-gradient(-135deg, #cbd9dc 10%, transparent 100%);
  /* background-color: #f067b4;
  background-image: linear-gradient(-135deg, #81ffef 10%, transparent 100%); */
}
.record_title::after {
  @media screen and (max-width: 450px) {
    display: none;
  }
  content: '';
  display: block;
  position: absolute;
  right: 0rem;
  left: 0rem;
  top: 0rem;
  border-radius: 10px;
  z-index: -1;
  bottom: 0rem;
  /* background-image: linear-gradient(25deg, #000e56, #27537e, #2f9da6, #00edcf); */
  background-image: linear-gradient(
    327deg,
    #586364,
    #6c7578 33%,
    #c7d5d9 75%,
    #6a7476
  );
  box-shadow: 1px 1px 1px white, -1px -1px 1px black;
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
  margin: 0.5rem;
}
.right table th {
  padding: 1rem 0;
}

.right table th,
.right table td,
.change_show_btn {
  transition: all 1s;
  text-align: center;
  border-radius: 7px;
  /* padding: 1rem 4rem; */
  font-size: 0.8rem;
  font-family: serif;
  font-weight: bold;
  text-shadow: -1px -1px 0px #d0dae8, 1px 1px 0px #000000;
  background-image: linear-gradient(
    150deg,
    #aab6ba,
    #cedcdf 21%,
    #6e777a,
    #566162
  );
  color: white;
  box-shadow: 5px 5px 7px #00000042, inset -4px -3px 4px 0px #02020285,
    1px 1px 0px 0px #ffffff, 3px 3px 4px 0px #ffffff4d;
  @media screen and (max-width: 450px) {
    text-shadow: 1px 1px 0px #788082;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;
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
.change_show_btn:hover {
  background-image: linear-gradient(
    -51deg,
    #ccdade,
    #cedcdf 21%,
    #6e777a,
    #566162
  );
  text-shadow: -1px -1px 0px #000000, 1px 1px 0px #d0dae8;
  box-shadow: inset 4px 4px 7px #00000045, inset 0px 0px 0px white,
    1px 1px 0px 0px #ebeaea99, 1px 1px 0px white, inset -1px -1px 7px #00000082;
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
  margin: 0 10px;
  cursor: pointer;
  padding: 0.5rem 0.6rem;
  text-shadow: -1px -1px 0px #d0dae8, 1px 1px 0px #000000;
  /* padding: 0rem 3rem; */
  transition: all 1s;
  border-radius: 10px;
  /* box-shadow: 2px 2px 4px #0000004d, inset 2px 2px 6px white,
    inset -2px -2px 6px #0000005e; */
  /* color: white; */
  /* background-color: #ff585d; */
  background-image: linear-gradient(
    150deg,
    #aab6ba,
    #cedcdf 21%,
    #6e777a,
    #566162
  );
  color: white;
  box-shadow: 5px 5px 7px #00000042, inset -4px -3px 4px 0px #02020285,
    1px 1px 0px 0px #ffffff, 3px 3px 4px 0px #ffffff4d;
}
.examintest:nth-child(1) {
  background-image: linear-gradient(
    150deg,
    #8ddff5,
    #a5eeff 21%,
    #2393bb,
    #0d82a9
  );
}
.examintest:nth-child(1):hover {
  background-image: linear-gradient(
    -51deg,
    #8ddff5,
    #a5eeff 21%,
    #2393bb,
    #0d82a9
  );
}
.examintest:nth-child(2) {
  background-image: linear-gradient(
    150deg,
    #f56c6c,
    #ffb8c8 21%,
    #dd0930,
    #990505
  );
}
.examintest:nth-child(2):hover {
  background-image: linear-gradient(
    -51deg,
    #f56c6c,
    #ffb8c8 21%,
    #dd0930,
    #990505
  );
}
.examintest:nth-child(3) {
  background-image: linear-gradient(
    150deg,
    #6cf5d5,
    #bff9d9 21%,
    #319361,
    #379b06
  );
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
