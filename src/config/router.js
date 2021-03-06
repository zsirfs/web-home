import axios from '../config/axios'
import isServer from '../utils/isServer'
import isDev from '../utils/isDev'
import clientId from '../utils/clientId'

export default (router) => {
  router.beforeEach((to, from, next) => {
    // 导航到某个路由之前
    if (to.meta.private) {
      const token = window.sessionStorage.getItem('token')
      return token ? next() : next({ path: '/login', query: { redirect: to.path } })
    }
    // 这里匿名统计访问用户
    next()
  })
  router.beforeResolve((to, from, next) => {
    !isDev() && axios.get('/stat/annoy', { params: { url: location.href, guid: clientId() } })
    // 必须返回next
    next()
  })
}
