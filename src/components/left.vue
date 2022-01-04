<template>
  <div class="left">
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
  </div>
</template>
<script>
export default {
  name: 'leftItem',
  props: ['total_data', 'leftShow'],

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
  height: 88vh;
  width: 23%;
  padding: 2rem;
  background-color: #f5f7fa;
  box-shadow: 1px 1px 7px #00000033;
  overflow-y: auto;
  padding-bottom: 6rem;
}
.left_title {
  height: 2rem;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 10px solid #50c1e9;
  box-shadow: 1px 1px 7px #00000033;
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
  width: 2rem;
  height: 2rem;
  margin: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 1px 1px 3px #00000033;
}
.serial_visited {
  background-color: #1ec0ff;
  color: white;
}
</style>
