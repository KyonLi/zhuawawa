import qs from 'qs'
import router from '@/router'
import store from '@/store'
import wechatAuth from '@/plugins/wechatAuth'
import {APPID} from '@/config'
// 设置APPID
wechatAuth.setAppId(APPID)
const whiteList = ['/error']
router.beforeEach(async (to, from, next) => {
  // 在白名单，直接进入
  if (whiteList.indexOf(to.path) !== -1) {
    return next()
  }
  const {loginStatus} = store.getters
  switch (Number(loginStatus)) {
    case 0:
      // 未登录
      wechatAuth.returnFromWechat(window.location.href)
      var code = wechatAuth.code
      if (code) {
        // 微信授权回调
        try {
          // 通过code换取token
          console.log('code: ' + code)
          // await store.dispatch('user/loginWechatAuth', code)
          await store.dispatch('user/setLoginStatus', 1)
          // 去除多余参数
          delete to.query.code
          delete to.query.state
          // 调试显示code
          to.params.code = code
          router.replace(to)
        } catch (err) {
          next({
            name: 'error',
            params: {
              desc: '微信授权登录失败'
            }
          })
        }
      } else {
        // 跳转微信授权页
        // 获取跳转地址
        wechatAuth.redirect_uri = processUrl()
        window.location.href = wechatAuth.authUrl
      }
      break
    case 1:
      // 已登录
      next()
      break
    default:
      break
  }
})

/**
 * 处理url链接
 * @returns {string}
 */
function processUrl() {
  const url = window.location.href
  // 解决多次登录url添加重复的code与state问题
  const urlParams = qs.parse(url.split('?')[1])
  let redirectUrl = url
  if (urlParams.code && urlParams.state) {
    delete urlParams.code
    delete urlParams.state
    const query = qs.stringify(urlParams)
    if (query.length) {
      redirectUrl = `${url.split('?')[0]}?${query}`
    } else {
      redirectUrl = `${url.split('?')[0]}`
    }
  }
  return redirectUrl
}
