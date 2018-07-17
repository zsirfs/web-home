import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './styles/app.scss'
import createApp from './app'
import hotjar from './config/hotjar'
import routerGuards from './config/router'
import mixins from './config/mixins'
import handler from './config/handler'
import facebook from './config/facebook'

Vue.use(mavonEditor)
Vue.use(hotjar, { enabled: false })
Vue.use(facebook, { enabled: false })
Vue.use(handler)

Vue.mixin(mixins)

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

routerGuards(router)

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    console.log('resolve')
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })
    const asyncDataHooks = activated.map((c) => c.asyncData).filter((_) => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })
  app.$mount('#app')
})
