import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index'), // 路由懒加载
    meta: {
      keepAlive: true // keep-alive 标识
    }
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/Game'), // 路由懒加载
    meta: {
      keepAlive: true // keep-alive 标识
    }
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/Error'),
  },
  {
    path: '*',
    redirect: '/error'
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    base: '/zhuawawa',
    scrollBehavior: () => ({y: 0}),
    routes: router
  })

export default createRouter()
