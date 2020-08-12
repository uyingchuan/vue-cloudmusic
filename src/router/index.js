import Vue from 'vue'
import VueRouter from 'vue-router'

// const 路由加载区
import Discovery from '@/page/discovery'
import Playlists from '@/page/playlists'
import PlaylistDetail from '@/page/playlist-detail'

// 应用内容区展示的页面
export const layoutCenterNames = ['discovery', 'playlists', 'songs', 'mvs']

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
    component: Playlists,
    meta: {
      title: '推荐歌单',
      icon: 'playlist-menu'
    }
  },
  {
    path: '/songs',
    name: 'songs',
    component: Discovery,
    meta: {
      title: '最新音乐',
      icon: 'yinyue'
    }
  },
  {
    path: '/mvs',
    name: 'mvs',
    component: Discovery,
    meta: {
      title: '最新MV',
      icon: 'mv'
    }
  }
]

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: PlaylistDetail
  },
  ...menuRoutes
]

const router = new VueRouter({
  routes
})

export default router
