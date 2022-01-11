<template>
  <div id="app">
    <headTop></headTop>
  </div>
</template>

<script>
const headTop = () => import('@/components/headTop.vue')
export default {
  name: 'App',
  components: {
    headTop
  },
  data() {
    return {

    }
  },
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>
