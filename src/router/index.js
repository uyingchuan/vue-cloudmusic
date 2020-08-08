import Vue from 'vue'
import VueRouter from 'vue-router'

// const 路由加载区
import Discovery from 'components/layout/discovery'

// 需要显示在侧边栏菜单的页面
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: {
      title: '发现音乐',
      icon: 'music'
    }
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: Discovery,
    meta: {
      title: '推荐歌单',
      icon: 'playlist-menu'
    }
  },
  {
    path: '/music',
    name: '',
    component: Discovery,
    meta: {
      title: '最新音乐',
      icon: 'yinyue'
    }
  },
  {
    path: '/mv',
    name: '',
    component: Discovery,
    meta: {
      title: '最新MV',
      icon: 'mv'
    }
  }
]

Vue.use(VueRouter)

const routes = [
  ...menuRoutes
]

const router = new VueRouter({
  routes
})

export default router
