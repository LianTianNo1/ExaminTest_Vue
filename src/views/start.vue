<template>
  <div class="start">
    <section>
      <div class="tip">
        <p>每个表都需要有上面的第一行，顺序没有要求</p>
        <p>
          下面必须按照单选、多选、判断、填空顺序建立（例子：如果是没有多选，建立多选这个表不写入内容，可以为空，在后面建立判断）
        </p>
      </div>

      <div class="example">
        <img src="../assets/example.png" alt="" />
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

    }
  },
  methods: {
    toUploadFile() {
      this.router.push('/examination')
    }
  },
}
</script>

<style lang="scss" scoped>
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
      background-color: #fff;
      letter-spacing: 1px;
      box-shadow: 0px 5px 40px 0px #113a5d1a;
    }
    .example {
      padding: 2rem 1rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow-y: scroll;
      height: calc(92vh - 92px);
      img {
        width: 60%;
        box-shadow: 4px 8px 20px #2c2b2b52;
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
