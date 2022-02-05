<template>
  <div class="exmination-box">
    <div class="uploadfile" v-if="chooseFileShow">
      <button @click="targetChooseFile" class="uploadfile_btn">
        <span>上传文件</span>
      </button>
      <input
        type="file"
        @change="chooseFile($event)"
        ref="file"
        class="choose_file"
      />
    </div>
    <div v-show="errPageShow" class="err_container">
      <div class="head_nav">一共错误{{ errNumber }}题</div>
      <div class="error_list"></div>
    </div>
    <div v-show="containerShow" class="container">
      <!-- 左边题号 -->
      <div :class="['left', { left_item_show: leftItemShow }]">
        <div
          v-for="item in total_data"
          :key="item.id"
          v-show="JSON.stringify(item.data) !== '{}' && item.data"
          class="sign_choose"
        >
          <div class="left_title">{{ item.title }}</div>
          <div class="left_item">
            <div
              @click="targetChooseItem(item['titletype'], index2, $event)"
              :key="item2 + item.data.data[item.data['title_index']]"
              v-for="(item2, index2) in item.data.data"
              :mydata="item.answerList[index2]"
              :class="['serial', { serial_visited: item.answerList[index2] }]"
            >
              {{ index2 + 1 }}
            </div>
          </div>
        </div>
        <div class="left_btn" @click="changeLeftShow">
          {{ leftItemShow ? '显示' : '隐藏' }}题号
        </div>
      </div>
      <!-- 右边做题区 -->
      <div :class="['right', { right_full: leftItemShow }]">
        <div class="sign_exercises_box">
          <div
            v-show="index === sign_item_index"
            :key="item[sign_list_data['title_index']]"
            v-for="(item, index) in sign_list_data.data"
            class="exercises_item"
          >
            <div class="etile">
              {{ index + 1 }}: {{ item[sign_list_data['title_index']] }}
            </div>
            <div class="echoose">
              <div
                @click="savaAnswer('sign', index, 'A', $event)"
                class="choose_item"
              >
                {{ item[sign_list_data['A_index']] }}
              </div>
              <div
                @click="savaAnswer('sign', index, 'B', $event)"
                class="choose_item"
              >
                {{ item[sign_list_data['B_index']] }}
              </div>
              <div
                @click="savaAnswer('sign', index, 'C', $event)"
                class="choose_item"
              >
                {{ item[sign_list_data['C_index']] }}
              </div>
              <div
                @click="savaAnswer('sign', index, 'D', $event)"
                class="choose_item"
              >
                {{ item[sign_list_data['D_index']] }}
              </div>
            </div>
            <div class="hide_item">
              正确答案:
              {{ item[sign_list_data['result_index']] }}
            </div>
          </div>
        </div>
        <div class="mult_exercises_box">
          <div
            v-show="index === mult_item_index"
            :key="item[mult_list_data['title_index']]"
            v-for="(item, index) in mult_list_data.data"
            class="exercises_item"
          >
            <div class="etile">
              {{ index + 1 }}: {{ item[mult_list_data['title_index']] }}
            </div>
            <div class="echoose">
              <div
                @click="savaAnswer('mult', index, 'A', $event)"
                class="choose_item"
              >
                {{ item[mult_list_data['A_index']] }}
              </div>
              <div
                @click="savaAnswer('mult', index, 'B', $event)"
                class="choose_item"
              >
                {{ item[mult_list_data['B_index']] }}
              </div>
              <div
                @click="savaAnswer('mult', index, 'C', $event)"
                class="choose_item"
              >
                {{ item[mult_list_data['C_index']] }}
              </div>
              <div
                @click="savaAnswer('mult', index, 'D', $event)"
                class="choose_item"
              >
                {{ item[mult_list_data['D_index']] }}
              </div>
            </div>
            <div class="hide_item">
              正确答案:
              {{ item[mult_list_data['result_index']] }}
            </div>
          </div>
        </div>
        <div class="judge_exercises_box">
          <div
            v-show="index === judge_item_index"
            :key="item[judge_list_data['title_index']]"
            v-for="(item, index) in judge_list_data.data"
            class="exercises_item"
          >
            <div class="etile">
              {{ index + 1 }}: {{ item[judge_list_data['title_index']] }}
            </div>
            <div class="echoose">
              <div
                @click="savaAnswer('judge', index, '对', $event)"
                class="choose_item"
              >
                对
              </div>
              <div
                @click="savaAnswer('judge', index, '错', $event)"
                class="choose_item"
              >
                错
              </div>
            </div>
            <div class="hide_item">
              正确答案:
              {{ item[judge_list_data['result_index']] }}
            </div>
          </div>
        </div>
        <div class="blank_exercises_box">
          <div
            v-show="index === blank_item_index"
            :key="item[blank_list_data['title_index']]"
            v-for="(item, index) in blank_list_data.data"
            class="exercises_item"
          >
            <div class="etile">
              {{ index + 1 }}: {{ item[blank_list_data['title_index']] }}
            </div>
            <div class="echoose">
              <input
                :key="item2 + index2"
                v-for="(item2, index2) in item[
                  blank_list_data['result_index']
                ].split('，')"
                type="text"
                :placeholder="`第${index2 + 1}空`"
                class="input_blank"
                @keyup="
                  saveBlank(
                    item[blank_list_data['result_index']],
                    index,
                    index2,
                    'blank',
                    $event
                  )
                "
              />
            </div>
            <div class="hide_item">
              正确答案:
              {{ item[blank_list_data['result_index']] }}
            </div>
          </div>
        </div>
        <div @click="nextItem" class="next_item el-icon-caret-bottom">
          下一题
        </div>
        <div @click="preItem" class="next_item el-icon-caret-top">上一题</div>
        <div @click="showResult" class="submit el-icon-s-claim">提交</div>
        <div @click="emptyReset" class="submit el-icon-refresh">
          重新选择文件
        </div>
        <div
          @click="leftItemShow = !leftItemShow"
          class="submit el-icon-collection-tag"
        >
          {{ leftItemShow ? '显示' : '隐藏' }}题号
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: "examination",

  computed: {
    ...mapState(['baseURL', 'userInfo', 'nowTestExamin'])
  },
  created() {
    //  从缓存中获取数据
    if (JSON.stringify(this.userInfo) === '{}') {
      this.updataUserInfo(JSON.parse(sessionStorage.getItem('userInfo')))
      // console.log(this.userInfo)
    }
    if (JSON.stringify(this.nowTestExamin) !== '{}') {
      this.initData(this.nowTestExamin)
    }
  },
  data() {
    return {
      // 控制left出现
      leftItemShow: false,
      toggleFlag: true,
      // 单选题库索引，题目，正确答案等等
      sign_list_data: {},
      // 多选
      mult_list_data: {},
      // 判断
      judge_list_data: {},
      // 填空
      blank_list_data: {},
      // 当前单选显示的项的索引
      sign_item_index: 0,
      // 当前多选显示的项的索引
      mult_item_index: -1,
      // 当前判断题显示的项的索引
      judge_item_index: -1,
      // 当前填空题显示的项的索引
      blank_item_index: -1,
      // 选择文件的按钮是否出现
      chooseFileShow: true,
      // 下一题
      nextShow: false,
      // 提交按钮
      submitShow: false,
      // 储存用户单选的答案
      sign_answerList: {},
      // 储存用户多选的答案
      mult_answerList: {},
      // 储存用户判断题的答案
      judge_answerList: {},
      // 储存用填空题的答案
      blank_answerList: {},
      // 数据
      total_data: [],
      // 错题页面显示
      errPageShow: false,

      // 答题内容显示
      containerShow: true,
      // 错题量
      errNumber: 0,
      multFlag: false,
      // 当前区域
      nowArea: '',
      // 手动激活视图渲染
      leftShow: {
        sign: true,
        mult: true,
        judge: true,
        blank: true,
      }

    }
  },
  watch: {
    sign_answerList: {
      handler(newValue) {
        console.log(this.sign_answerList, newValue)
      },
      deep: true,
    }
  },
  methods: {
    ...mapMutations(['updataUserInfo', 'setNowTestExamin']),
    emptyReset() {
      this.setNowTestExamin({})
      this.$emit('reloadComponent')
    },
    // 切换题号
    changeLeftShow() {
      this.leftItemShow = !this.leftItemShow
    },
    targetChooseItem(titletype, index) {
      this.chooseItem([titletype, index])
    },
    // 触发文件选择
    targetChooseFile() {
      const chooseFile = this.$refs.file
      chooseFile.click()
    },
    chooseItem2(e) {
      console.log(e)
    },
    // 选中该项
    chooseItem(params) {
      this.nowArea = params[0]
      const index = params[1]
      if (this.nowArea === 'sign') {
        this.judge_item_index = -1
        this.mult_item_index = -1
        this.blank_item_index = -1
        this.sign_item_index = index
      } else if (this.nowArea === 'mult') {
        this.judge_item_index = -1
        this.sign_item_index = -1
        this.blank_item_index = -1
        this.mult_item_index = index
      } else if (this.nowArea === 'judge') {
        this.sign_item_index = -1
        this.mult_item_index = -1
        this.blank_item_index = -1
        this.judge_item_index = index
      } else if (this.nowArea === 'blank') {
        this.sign_item_index = -1
        this.judge_item_index = -1
        this.mult_item_index = -1
        this.blank_item_index = index
      }
    },
    // 选择文件
    chooseFile(e) {
      const file = e.target.files[0]
      // console.log(file)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", this.userInfo.username);
      this.uploadFile(formData)
    },
    initData(data) {
      this.sign_list_data = data.sign_data
      if (JSON.stringify(this.sign_list_data) !== '{}' && this.sign_list_data.data.length > 0) {
        this.sign_list_data.data.shift()
        this.sign_list_data.data.sort(() => 0.5 - Math.random())
      }

      this.mult_list_data = data.mult_data
      if (JSON.stringify(this.mult_list_data) !== '{}' && this.mult_list_data.data.length > 0) {
        this.mult_list_data.data.shift()
        this.mult_list_data.data.sort(() => 0.5 - Math.random())
      }
      this.judge_list_data = data.judge_data
      if (JSON.stringify(this.judge_list_data) !== '{}' && this.judge_list_data.data.length > 0) {
        this.judge_list_data.data.shift()
        this.judge_list_data.data.sort(() => 0.5 - Math.random())
      }
      this.blank_list_data = data.blank_data
      if (JSON.stringify(this.blank_list_data) !== '{}' && this.blank_list_data.data.length > 0) {
        this.blank_list_data.data.shift()
        this.blank_list_data.data.sort(() => 0.5 - Math.random())
      }

      this.total_data.push({
        id: 1,
        title: '单选题',
        data: this.sign_list_data,
        answerList: this.sign_answerList,
        titletype: 'sign'
      }, {
        id: 2,
        title: '多选题',
        data: this.mult_list_data,
        answerList: this.mult_answerList,
        titletype: 'mult'
      }, {
        id: 3,
        title: '判断题',
        data: this.judge_list_data,
        answerList: this.judge_answerList,
        titletype: 'judge'
      }, {
        id: 4,
        title: '填空题',
        data: this.blank_list_data,
        answerList: this.blank_answerList,
        titletype: 'blank'
      })
      this.chooseFileShow = false
      this.errPageShow = false
      this.containerShow = true
      this.multFlag = false
      this.sign_item_index = 0
      this.mult_item_index = -1
      this.judge_item_index = -1
      this.blank_item_index = -1
    },
    // 上传文件并获取数据
    uploadFile(formData) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post(this.baseURL + '/demo/examination/readFile', formData, config).then(res => {
        if (res.data.code === 1 && res.data.error === null) {
          console.log(res)
          this.initData(res.data.data)
          this.$message.success(res.data.msg);
        } else {
          console.log(res)
          this.$message.error(res.data.msg);
        }
      })
    },
    // 上一题
    preItem() {
      this.leftShow[this.nowArea] = false
      setTimeout(() => {
        this.leftShow[this.nowArea] = true
      }, 0)
      if (this.nowArea === 'sign') {
        if (this.sign_item_index <= 0) {
          return false
        }
        this.sign_item_index--
      } else if (this.nowArea === 'mult') {
        if (this.mult_item_index <= 0) {
          return false
        }
        this.mult_item_index--
      } else if (this.nowArea === 'judge') {
        if (this.judge_item_index <= 0) {
          return false
        }
        this.judge_item_index--
      } else if (this.nowArea === 'blank') {
        if (this.blank_item_index <= 0) {
          return false
        }
        this.blank_item_index--
      }
    },
    // 下一题
    nextItem() {
      this.leftShow[this.nowArea] = false
      setTimeout(() => {
        this.leftShow[this.nowArea] = true
      }, 0)
      if (this.nowArea === 'sign') {
        if (this.sign_item_index >= this.sign_list_data.data.length - 1) {
          return false
        }
        this.sign_item_index++
      } else if (this.nowArea === 'mult') {
        if (this.mult_item_index >= this.mult_list_data.data.length - 1) {
          return false
        }
        this.mult_item_index++
      } else if (this.nowArea === 'judge') {
        if (this.judge_item_index >= this.judge_list_data.data.length - 1) {
          return false
        }
        this.judge_item_index++
      } else if (this.nowArea === 'blank') {
        if (this.blank_item_index >= this.blank_list_data.data.length - 1) {
          return false
        }
        this.blank_item_index++
      }
    },
    // 保存填空题答案
    saveBlank(result, index, index2, area, e) {
      this.nowArea = area
      const blankArr = []
      const chilrens = [...e.target.parentNode.children]
      chilrens.forEach(item => {
        blankArr.push(item.value)
      })
      const resultArr = result.split('，')
      if (blankArr.length === resultArr.length && blankArr.toString() === resultArr.toString()) {
        e.target.parentNode.parentNode.isSuccess = true
        e.target.parentNode.parentNode.setAttribute('isSuccess', true)
      } else {
        e.target.parentNode.parentNode.isSuccess = false
        e.target.parentNode.parentNode.setAttribute('isSuccess', false)
      }
      this.blank_answerList[index] = blankArr
    },
    // 保存答案
    savaAnswer(area, index, choose, e) {
      this.nowArea = area
      if (area === 'sign') {
        this.sign_answerList[index] = choose

        if (this.sign_list_data.data[this.sign_item_index][this.sign_list_data.result_index] === this.sign_answerList[this.sign_item_index]) {
          e.target.parentNode.parentNode.isSuccess = true
          e.target.parentNode.parentNode.setAttribute('isSuccess', true)
        } else {
          e.target.parentNode.parentNode.isSuccess = false
          e.target.parentNode.parentNode.setAttribute('isSuccess', false)
        }
        const chooseItmes = [...e.target.parentNode.children]
        chooseItmes.forEach(item => {
          item.className = 'choose_item'
        })
        e.target.className = 'choose_item choose_item_active'
      } else if (area === 'mult') {
        let beforeAnswer = this.mult_answerList[index]
        if (!beforeAnswer) {
          beforeAnswer = new Set()
        }
        if (e.target.className === 'choose_item') {
          e.target.className = 'choose_item choose_item_active'
          beforeAnswer.add(choose)
        } else {
          e.target.className = 'choose_item'
          beforeAnswer.delete(choose)
        }
        const correctAnswer = this.mult_list_data.data[this.mult_item_index][this.mult_list_data.result_index]
        for (let i = 0; i < correctAnswer.length; i++) {
          this.multFlag = beforeAnswer.has(correctAnswer[i])
          if (!this.multFlag) {
            break;
          }
        }
        if (this.multFlag && correctAnswer.length === beforeAnswer.size) {
          e.target.parentNode.parentNode.isSuccess = true
          e.target.parentNode.parentNode.setAttribute('isSuccess', true)
        } else {
          e.target.parentNode.parentNode.isSuccess = false
          e.target.parentNode.parentNode.setAttribute('isSuccess', false)
        }
        this.mult_answerList[index] = beforeAnswer
        this.multFlag = false
      } else if (area === 'judge') {
        this.judge_answerList[index] = choose

        if (this.judge_list_data.data[this.judge_item_index][this.judge_list_data.result_index] === this.judge_answerList[this.judge_item_index]) {
          e.target.parentNode.parentNode.isSuccess = true
          e.target.parentNode.parentNode.setAttribute('isSuccess', true)
        } else {
          e.target.parentNode.parentNode.isSuccess = false
          e.target.parentNode.parentNode.setAttribute('isSuccess', false)
        }
        console.log(this.judge_answerList)
        const chooseItmes = [...e.target.parentNode.children]
        chooseItmes.forEach(item => {
          item.className = 'choose_item'
        })
        e.target.className = 'choose_item choose_item_active'
      }
    },
    // 答题结果
    showResult() {
      this.containerShow = false
      this.errPageShow = true
      const errorList = []
      const successList = []
      const totalList = [...document.querySelectorAll('.exercises_item')]
      const errorDivDom = document.querySelector('.error_list')
      // console.log(errorDivDom)
      totalList.forEach(item => {
        item.style.display = 'block'
        item.children[2].style.display = 'block'
        if (item.isSuccess) {
          successList.push(item)
        } else {
          errorList.push(item)

          errorDivDom.appendChild(item)
        }
      })
      this.errNumber = errorList.length
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.exmination-box {
  position: relative;
  overflow: hidden;
  height: 92vh;
  @media screen and (max-width: 420px) {
    height: 90vh;
  }
}
.exmination-box::after {
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
.uploadfile {
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 92vh;
  background: #000000b0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 420px) {
    height: 90vh;
  }
}

.uploadfile_btn {
  width: 6rem;
  height: 2rem;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px #ffffff80, 7px 7px 20px 0px #0000001a,
    4px 4px 5px 0px #0000001a;
  outline: none;
  background: linear-gradient(0deg, #ff9700 0%, #fb4b02 100%);
  line-height: 2rem;
  padding: 0;
  border: none;
}
.uploadfile_btn span:before,
.uploadfile_btn span:after {
  position: absolute;
  content: '';
  left: 0;
  top: 0;
  background: rgba(251, 75, 2, 1);
  box-shadow: -7px -7px 20px 0px #ffffffe6, 1px 1px 4px 0px #ffffffe6,
    7px 7px 20px 0px #00000033, 4px 4px 5px 0px #0000004d;
  transition: all 0.3s ease;
}
.uploadfile_btn span:hover:after {
  width: 100%;
}
.uploadfile_btn span:after {
  height: 2px;
  width: 0%;
}
.uploadfile_btn span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.uploadfile_btn span:before {
  width: 2px;
  height: 0%;
}
.uploadfile_btn span:hover:before {
  height: 100%;
}
.uploadfile_btn:before,
.uploadfile_btn:after {
  position: absolute;
  content: '';
  right: 0;
  bottom: 0;
  background: rgba(251, 75, 2, 1);
  box-shadow: -7px -7px 20px 0px #ffffffe6, -4px -4px 5px 0px #ffffffe6,
    7px 7px 20px 0px #00000033, 4px 4px 5px 0px #0000004d;
  transition: all 0.3s ease;
}
.uploadfile_btn:after {
  width: 0%;
  height: 2px;
}
.uploadfile_btn:before {
  height: 0%;
  width: 2px;
}
.uploadfile_btn:hover {
  color: rgba(251, 75, 2, 1);
  background: #e0e5ec;
}
.uploadfile_btn:hover:before {
  height: 100%;
}
.uploadfile_btn:hover:after {
  width: 100%;
}
.choose_file {
  width: 0;
  height: 0;
}
.headinfo,
.head_nav {
  margin-bottom: 2vh;
  background-color: #f5f7fa;
  box-shadow: 0px 1px 7px #00000033;
}
.head_nav {
  color: white;
  background-color: #ff6600;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 0;
  background-image: linear-gradient(25deg, #ee526a, #d0779a, #a094cb, #20adff);
}
.head_title {
  color: #336699;
  width: 100%;
  height: 10vh;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 100%;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
}
.left {
  height: 92vh;
  width: 23%;
  padding: 1rem;
  background-color: #f5f7fa;
  box-shadow: 1px 1px 7px #00000033;
  overflow-y: auto;
  padding-bottom: 6rem;
  min-width: 350px;
  max-width: 350px;
  background-color: rgba(255, 255, 255, 0.274);
  transition: all 1s;
}
.left_btn {
  height: 2rem;
  font-weight: bold;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #606060;
  border-radius: 8px;
  cursor: pointer;
  border-left: 10px solid #50c1e9;
  border-right: 10px solid #e94c6f;
  background-color: #ffffff91;
  transition: all 1s;
}
.left_btn:hover {
  color: white;
  background-color: #50c1e9;
  background-image: linear-gradient(-45deg, #e94c6f, #50c1e9);
}

.left_item_show {
  width: 0;
  min-width: 0px;
  padding: 0;
  border: none;
}
.left_title {
  height: 2rem;
  font-weight: bold;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-left: 10px solid #e2ebee;
  box-shadow: 3px 0px 7px 1px #fa759b80, inset 1px 0px 1px #000000;
  text-shadow: 1px 1px 0px #151515, 2px 2px 0px #cbcbcb;
  background-image: linear-gradient(45deg, #fa8cab, #fb7299);
}
.left_item {
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.serial {
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.2rem;
  font-size: 0.5rem;
  color: #5a697a;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
  background: #ffffff;
  box-shadow: 2px 2px 0px #71717191;
}
.serial_visited {
  box-shadow: 2px 2px 0px #eaeef1;
  background: #fb7299;
  color: white;
}
.right_full {
  width: 100% !important;
}
.right {
  transition: all 1s;
  height: 92vh;
  overflow-y: auto;
  width: 75%;
  background: #ffffff2e;
  box-shadow: -1px -1px 7px #00000033;
  padding: 2rem;
}
.exercises_item {
  display: block;
}
.etile {
  color: #717171;
  display: flex;
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 1rem;
  border-left: 20px solid #5cd4ff;
  margin-bottom: 2rem;
  box-shadow: 4px 3px 8px 0px #5b565654, inset 3px 0px 3px #00000054;
  background: linear-gradient(335deg, #ffffff, #ffffff, #e8edef, #f8f8f8);
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
}
.hide_item {
  @media screen and (max-width: 450px) {
    margin: 0;
  }
  display: none;
  color: white;
  padding: 0.4rem;
  box-shadow: 3px 3px 7px 2px #a5939333;
  /* font-weight: bold; */
  text-align: center;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  margin: 20px 0;
  background-color: #2cc0b3a3;
}
.choose_item {
  padding: 0.6rem 0.6rem 0.6rem 4rem;
  box-shadow: 3px 3px 7px 2px #5b565654;
  cursor: pointer;
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: #804d02;
  font-family: serif;
  position: relative;
  background: #fafafaa3;
  margin: 20px 0;
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

.choose_item_active {
  background-image: linear-gradient(135deg, transparent 10%, #f067b4 100%);
  background-color: #81ffef;
  color: #606266;
  animation: choose_item_active 1s;
}
@keyframes choose_item_active {
  to {
    background-color: #f16b6f;
    background-image: linear-gradient(135deg, #81ffef 10%, transparent 100%);
  }
}
.choose_item::before {
  position: absolute;
  content: 'A';
  color: white;
  left: 0rem;
  background-color: #fcaa67;
  height: 100%;
  width: 3rem;
  top: 0;
  box-shadow: 1px 0px 1px #0000005e;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input_blank {
  padding: 1rem;
  min-width: 2rem;
  margin: 1rem;
  box-shadow: 4px 5px 8px 0px #0000001a;
  letter-spacing: 2px;
  outline: none;
  background: transparent;
  border: none;
  color: #4d4d4d;
  border-bottom: 1px solid #00bbff;
  background-image: linear-gradient(1deg, #ffffff, transparent);
  border-radius: 49% 51% 50% 50% / 90% 55% 45% 10%;
  animation: border_move 3s linear alternate-reverse infinite;
}
@keyframes border_move {
  50% {
    border-radius: 32% 68% 26% 74% / 69% 42% 58% 31%;
  }
  to {
    border-radius: 47% 53% 50% 50% / 100% 100% 0% 0%;
  }
}
.echoose > div:nth-child(2)::before {
  content: 'B';
  background-color: #1ec0ff;
}
.echoose > div:nth-child(3)::before {
  content: 'C';
  background-color: #e94c6f;
}
.echoose > div:nth-child(4)::before {
  content: 'D';
  background-color: #1fda9a;
}
.next_item,
.submit {
  margin: 0.4rem 0;
  background-color: #f16b6f;
  color: white;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  font-size: 0.6rem;
  padding: 0.6rem 0;
  cursor: pointer;
  background-image: linear-gradient(135deg, #fccf31 10%, #f55555 100%);
  box-shadow: 3px 3px 7px 2px #5b565654, inset 1px 1px 3px white,
    inset -1px -1px 5px black;
}
.submit {
  background-color: #35a7ff;
  background-image: linear-gradient(25deg, #822ef6, #7d73f7, #6aa7f8, #2bd8f7);
}
.err_container {
  /* overflow: hidden; */
  position: absolute;
  display: block;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  left: 0;
  right: 0;
}
.error_list {
  padding-top: 2rem;
  width: 100vw;
  height: calc(90vh - 1.2rem);
  overflow-y: scroll;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: flex-start;
  .choose_item_active {
    text-shadow: none;
    font-weight: bold;
  }
  .hide_item {
    font-size: 0.7rem;
    padding: 0.3rem;
  }
  .choose_item {
    margin: 5px 0;
    padding: 0.5rem;
    font-size: 0.6rem;
    padding-left: 3.4rem;
    color: #504e4e;
    font-family: '';
  }
  .exercises_item {
    @media screen and (max-width: 450px) {
      width: 90%;
    }
    width: 19%;
    margin-bottom: 2rem;
    box-shadow: 1px 1px 7px #00000033;
    border-radius: 15px;
    overflow: hidden;
    background-color: #dfdfdf6b;
  }
  .exercises_item .etile {
    font-size: 1rem;
    padding: 0.3rem 0.3rem;
    margin-bottom: 0.5rem;
    font-size: 0.7rem;
    @media screen and (max-width: 450px) {
      padding: 0.5rem 0.5rem;
    }
  }
}
</style>
