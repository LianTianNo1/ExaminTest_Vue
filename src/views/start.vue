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
  box-sizing: border-box;
  border: 10px solid #cbd9dc;
  box-shadow: 6px 8px 7px #00000042, inset 5px 5px 8px 0px #02020285,
    inset -2px -2px 5px 1px #5c5b5b, 3px 3px 20px #2c2b2b52;
  background-image: linear-gradient(
    90deg,
    rgb(199, 239, 255),
    rgb(184, 196, 255)
  );
  box-sizing: border-box;
  section {
    width: 100vw;
    .tip {
      width: calc(100% - 20px);
      box-sizing: border-box;
      padding: 1rem;
      color: #616567;
      font-size: 0.7rem;
      box-shadow: 5px 6px 7px #2c2b2b52;
      background-image: linear-gradient(
        180deg,
        rgb(194, 205, 255),
        rgb(255, 189, 233)
      );
      letter-spacing: 1px;
    }
    .example {
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 80%;
        box-shadow: 8px 10px 12px #2c2b2b52;
      }
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
    box-shadow: 5px 6px 7px #2c2b2b52;
    background-image: linear-gradient(180deg, #ffbdca, #ccf1ff);
    animation: right_move 1s cubic-bezier(0.34, 0, 0.84, 1) infinite alternate;
  }
  @keyframes right_move {
    to {
      transform: translate(20px, 0);
    }
  }
}
</style>
