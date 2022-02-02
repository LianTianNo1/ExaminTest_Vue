<template>
  <div :class="['left', { left_item_show: leftItemShow }]">
    <div
      v-for="item in total_data"
      :key="item.id"
      v-show="JSON.stringify(item.data) !== '{}' && item.data"
      class="sign_choose"
    >
      <div class="left_title">{{ item.title }}</div>
      <div class="left_item" v-if="leftShow[item['titletype']]">
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
    <div class="left_btn" @click="$emit('parentChangeLeftShow', !leftItemShow)">
      {{ leftItemShow ? '显示' : '隐藏' }}题号
    </div>
  </div>
</template>
<script>
export default {
  name: 'leftItem',
  props: ['total_data', 'leftItemShow', 'leftShow'],

  data() {
    return {
    }
  },

  methods: {
    targetChooseItem(titletype, index, e) {
      this.$emit('parentChooseItem', [titletype, index])
    }
  },
}
</script>
<style  scoped>
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
  color: #f5f7fa;
  border-radius: 8px;
  cursor: pointer;
  border-left: 10px solid #50c1e9;
  border-right: 10px solid #50c1e9;
  box-shadow: 3px 0px 7px 1px #00000066, inset 2px 2px 2px #0000007a,
    inset -2px -2px 2px #0000007a;
  text-shadow: 1px 1px 0px #7d878a, 2px 2px 0px #5d6567, 3px 3px 0px #ffffff,
    4px 4px 0px #606568;
  background-image: linear-gradient(45deg, transparent 32%, #087ee9);
  background-color: #ff5142;
  transition: all 2s;
}
.left_btn:hover {
  background-color: #6c9ff7;
  background-image: linear-gradient(-45deg, #f65f52, #61aef8, transparent);
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
  box-shadow: 3px 0px 7px 1px #00000066, inset 1px 0px 1px #000000;
  text-shadow: 1px 1px 0px #151515, 2px 2px 0px #cbcbcb;
  background-image: linear-gradient(45deg, #323232, #323232);
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
  background-image: linear-gradient(
    115deg,
    #7e60f7,
    #804af7 25%,
    #7e6cf7,
    #66abf8
  );
  box-shadow: 2px 2px 0px #63d0ff;
  color: white;
}
</style>
