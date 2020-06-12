<template>
  <div class="app-container">
    <van-empty image="error" :description="desc" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Empty} from 'vant'

  Vue.use(Empty)
  export default {
    name: 'Error',
    data() {
      return {
        desc: this.$route.params.desc?this.$route.params.desc:'页面不存在'
      }
    }
  }
</script>

<style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f7f8fa;
    height: 100vh;
    padding-bottom: 100px;
    box-sizing: border-box;
  }
</style>
