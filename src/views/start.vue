<template>
  <div class="start">
    <section>
      <div class="tip">
        <p>每个表都需要有上面的第一行"题号,题目,A,B,C,D..."，顺序没有要求</p>
        <p>下面必须按照单选、多选、判断、填空顺序建立</p>
        <p>
          (例子：如果是没有多选，建立多选这个表不写入内容，可以为空，在后面建立判断)
        </p>
      </div>
      <div class="banner">
        <div class="banner_wrap">
          <ul class="banner_list">
            <li :class="{ imgActive: 0 === imgIndex }">
              <img src="../assets/example1.png" alt="" />
            </li>
            <li :class="{ imgActive: 1 === imgIndex }">
              <img src="../assets/example2.png" alt="" />
            </li>
            <li :class="{ imgActive: 2 === imgIndex }">
              <img src="../assets/example3.png" alt="" />
            </li>
            <li :class="{ imgActive: 3 === imgIndex }">
              <img src="../assets/example4.png" alt="" />
            </li>
          </ul>
          <p :class="['title', { textshow: textshow }]">
            {{ textArr[imgIndex].substring(0, 3) }}
          </p>
          <p :class="['tip', 'el-icon-info', { textshow: textshow }]">
            {{ textArr[imgIndex] }}
          </p>
          <ul class="tab">
            <li
              :class="{ active: index === imgIndex }"
              :key="index"
              v-for="(item, index) in 4"
              @click="imgIndex = index"
              @mouseover="clearTimer(index)"
              @mouseout="autoTimer"
            ></li>
          </ul>
        </div>
      </div>
    </section>
    <div class="toExamin el-icon-caret-right" @click="toUploadFile">
      去上传文件
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgIndex: 0,
      textArr: [
        `单选题->建立在第一个表(表必须是第一个，可为空占位)->表头必须包含：题号、题目、A、B、C、D、答案（顺序随意）`,
        `多选题->建立在第二个表(表必须是第二个，可为空占位)-->表头必须包含：题号、题目、A、B、C、D、答案（顺序随意）`,
        `判断题->建立在第三个表(表必须是第三个，可为空占位)-->表头必须包含：题号、题目、答案（顺序随意）`,
        `填空题->建立在第四个表(表必须是第四个，可为空占位)-->表头必须包含：题号、题目、答案（顺序随意,填空的答案使用中文逗号分隔）`
      ],
      textshow: false,
      pAnimationControl: null
    }
  },
  methods: {
    toUploadFile() {
      this.router.push('/examination')
    },
    autoMove() {
      if (this.imgIndex >= 3) this.imgIndex = -1
      this.textshow = true
      this.imgIndex++
      this.pAnimationControl = setTimeout(() => {
        this.textshow = false
      }, 3000);
    },
    clearTimer(index) {
      this.imgIndex = index
      this.textshow = true
      clearInterval(this.timer)
      clearTimeout(this.pAnimationControl)
    },
    autoTimer() {
      this.timer = setInterval(this.autoMove, 3500);
    }
  },
  mounted() {
    this.timer = setInterval(this.autoMove, 3500);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
.clearfix::after {
  content: '';
  display: block;
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}
.start {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  height: 92vh;
  overflow: hidden;
  box-sizing: border-box;
  @media screen and (max-width: 420px) {
    height: 90vh;
  }
  section {
    width: 100vw;

    .tip {
      width: 100%;
      box-sizing: border-box;
      padding: 1rem;
      color: #616567;
      font-size: 0.7rem;
      background-color: #ffffffa3;
      letter-spacing: 1px;
      box-shadow: 0px 5px 40px 0px #113a5d1a;
    }

    .banner {
      padding: 2rem 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(92vh - 114px);
      .banner_wrap {
        @media screen and (max-width: 420px) {
          width: 90vw;
          height: 100vw;
        }
        width: 53vw;
        height: 32vw;
        min-height: 280px;
        background: #1a1818;
        position: relative;
        box-shadow: 4px 5px 11px #00000029;
        border-radius: 10px;
        p.textshow {
          opacity: 1 !important;
          transform: translate(-50%, 0px) !important;
        }
        p.title {
          transition: all cubic-bezier(0.79, 0.01, 0.76, 1.47) 0.5s;
          width: 80%;
          margin: 0;
          font-weight: bold;
          font-size: 24px;
          color: #ffffff;
          margin-top: 1rem;
          // text-align: center;
          padding: 0.5rem 1rem;
          position: relative;
          left: 50%;
          opacity: 0;
          transform: translate(-100%, 0px);
        }
        p.tip {
          opacity: 0;
          transform: translate(100%, 0px);
          transition: all cubic-bezier(0.79, 0.01, 0.76, 1.47) 0.5s;
          position: relative;
          line-height: 1.5;
          left: 50%;
          width: 80%;
          margin: 0rem auto;
          border-radius: 40px;
          padding: 0.5rem 1rem;
          color: #889db8;
          background: none;
          box-shadow: none;
        }
        ul.banner_list {
          position: relative;
          z-index: 1;
          padding: 1rem;
          list-style: none;
          clear: both;
          width: 100%;
          height: 51%;
          li {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            display: none;
            height: 100%;
            transition: all 0.4s;
            border-radius: 10px 10px 0 0;
            overflow: hidden;
            img {
              height: 100%;
              width: 100%;
            }
          }
          li.imgActive {
            display: block;
          }
        }
        // ul.banner_list::after {
        //   content: '';
        //   display: block;
        //   position: absolute;
        //   top: -3rem;
        //   left: -1rem;
        //   right: -1rem;
        //   bottom: -1rem;
        //   z-index: -1;
        //   background-color: #ffffff7d;
        //   border-radius: 10px 10px 5px 5px;
        //   box-shadow: 11px 9px 10px #0000003d;
        // }
        ul.tab {
          position: absolute;
          list-style: none;
          bottom: 0;
          left: calc(50% - 1.2rem);
          transform: translate(-50%, 0);
          z-index: 3;
          display: flex;
          justify-content: space-evenly;
          margin: 1rem;
          li {
            border-radius: 50%;
            background-color: #fb729975;
            padding: 0.3rem;
            margin: 0.2rem;
            width: 0rem;
            transition: all 0.4s;
            cursor: pointer;
          }
          li.active {
            background-color: #fb7299;
            width: 2.4rem;
            border-radius: 15px;
          }
        }
      }
    }
  }
  @keyframes btn_move {
    to {
      background-position: -400% 0;
    }
  }
  .toExamin {
    display: flex;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 30px;
    justify-content: center;
    align-content: center;
    color: white;
    text-align: center;
    letter-spacing: 2px;
    border-radius: 10px;
    padding: 1rem;
    cursor: pointer;
    background-image: linear-gradient(
      90deg,
      #edecea,
      #fb7299,
      #ffeb3b,
      #eae9e8
    );
    background-size: 400%;
    border-radius: 55px;
    animation: right_move 1s cubic-bezier(0.34, 0, 0.84, 1) infinite alternate;
  }
  .toExamin:hover,
  .toExamin:hover::after {
    animation: btn_move 8s infinite;
  }

  .toExamin::after {
    content: '';
    position: absolute;
    left: -1px;
    right: -1px;
    top: -1px;
    bottom: -1px;
    background-image: linear-gradient(
      76deg,
      #fb7299,
      #ec2c62,
      #ffeb3b,
      #eae9e8
    );
    background-size: 400%;
    border-radius: 55px;
    filter: blur(15px);
    z-index: -1;
  }
  @keyframes right_move {
    to {
      transform: translate(20px, 0);
    }
  }
}
.start::after {
  position: absolute;
  top: 0;
  left: 0;
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
</style>
