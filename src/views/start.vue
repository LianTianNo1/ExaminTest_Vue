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
          <p class="tip el-icon-info">
            {{ textArr[imgIndex] }}
          </p>
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
      ]
    }
  },
  methods: {
    toUploadFile() {
      this.router.push('/examination')
    },
    autoMove() {
      if (this.imgIndex >= 3) this.imgIndex = -1
      this.imgIndex++
    },
    clearTimer(index) {
      this.imgIndex = index
      clearInterval(this.timer)
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
        width: 65%;
        height: 37%;
        position: relative;
        p.tip {
          position: absolute;
          top: -70%;
          background: #fb7299;
          line-height: 1.5;
          border-radius: 40px;
          padding: 0.5rem 1rem;
          color: white;
          box-shadow: 1px 1px 1px #38303075;
        }
        ul.banner_list {
          position: relative;
          z-index: 1;
          padding: 1rem;
          list-style: none;
          clear: both;
          width: 100%;
          height: 100%;
          li {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            display: none;
            height: 100%;
            transition: all 0.4s;
            border-radius: 8px;
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
        ul.banner_list::after {
          content: '';
          display: block;
          position: absolute;
          top: -3rem;
          left: -1rem;
          right: -1rem;
          bottom: -1rem;
          z-index: -1;
          background-color: #ffffff7d;
          border-radius: 10px 10px 5px 5px;
          box-shadow: 11px 9px 10px #0000003d;
        }
        ul.tab {
          position: absolute;
          list-style: none;
          top: -21%;
          right: -3%;
          z-index: 3;
          display: flex;
          justify-content: space-evenly;
          margin: 1rem;
          li {
            border-radius: 50%;
            background-color: #fff;
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
      #03a9f4,
      #f441a5,
      #ffeb3b,
      #03a9f4
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
