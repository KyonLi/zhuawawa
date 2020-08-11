<template>
  <div class="app-container">
    <button @click="btnClick">{{btn}}</button>
  </div>
</template>

<script>
  import {AnimationControl} from "../model/AnimationControl"
  let animationControl
  export default {
    name: 'Game',
    data() {
      return {
        state: 0, // 0等待开始 1已经开始等待抓取 2结束等待重置
        btn: "开始"
      }
    },
    methods: {
      btnClick() {
        if (this.state == 0){
          animationControl.start()
          this.btn = "抓娃娃"
          this.state = 1
        }
        else if (this.state == 1){
          animationControl.catch()
        }
        else if (this.state == 2) {
          animationControl.reset()
          this.btn = "开始"
          this.state = 0
        }
      },
      stop() {
        let catchedIndex = animationControl.catchedIndex
        if (catchedIndex == undefined) {
          this.btn = "开始"
          this.state = 0
        } else {
          this.btn = "重置"
          this.state = 2
        }
      }
    },
    mounted(){
      animationControl = new AnimationControl(this);
    },
    created() {

    }
  }
</script>

<style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    margin-top: 20px;
    font-size: 30px;
  }
</style>
