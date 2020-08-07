import Vue from 'vue'
import VueRouter from 'vue-router'

// const 路由加载区
import Discovery from 'view/discovery'

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
