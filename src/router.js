import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      // 路由对象
      {
        path: '/',
        component: () => import('./pages/Index/Index.vue'),
        meta: {
          title: '主页'
        }
      },
      {
        path: '/login',
        component: () => import('./pages/Auth/Login.vue'),
        meta: {
          title: '登录'
        }
      },
      {
        path: '/home',
        component: () => import('./pages/Home/Index.vue'),
        meta: {
          title: '详情'
        }
      },
      {
        path: '/edit',
        component: () => import('./pages/Edit/Index.vue'),
        meta: {
          title: '创建或修改',
          private: true
        }
      },
      {
        path: '/detail/:id',
        component: () => import('./pages/Detail/Index.vue'),
        meta: {
          title: '详情'
        }
      },
      {
        path: '/me',
        component: () => import('./pages/Me/Me.vue'),
        meta: {
          title: '关于我'
        }
      },
      {
        path: '/tech',
        component: () => import('./pages/Tech/Tech.vue'),
        redirect: '/tech/regex',
        children: [
          {
            path: 'regex',
            component: () => import('./pages/Tech/RegexList/RegexList.vue'),
            meta: {
              title: '正则表达式查询'
            }
          },
          {
            path: 'mini-code',
            component: () => import('./pages/Tech/MiniCode/MiniCode.vue'),
            meta: {
              title: '微代码'
            }
          },
          {
            path: 'lib',
            component: () => import('./pages/Tech/LibList/CdnAssetList.vue'),
            meta: {
              title: '我的Cdn'
            }
          }
        ]
      }
    ]
  })
}
