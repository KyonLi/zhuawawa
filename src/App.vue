<template>
  <div class="app" id="app">
    <transition name="van-fade">
      <keep-alive>
        <router-view v-show="show" v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
      </keep-alive>
    </transition>
    <transition name="van-fade">
      <router-view v-show="show" v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        show: true
      }
    },
    watch: {
      $route() {
        this.show = false
        this.show = true
      }
    }
  }
</script>
<style>
  html {
    background: #ededed;
  }
</style>
