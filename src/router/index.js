import Vue from 'vue'
import VueRouter from 'vue-router'

// const 路由加载区
const Discovery = () => import(/* webpackChunkName: "Discovery" */ '@/page/discovery')
const Playlists = () => import(/* webpackChunkName: "Playlists" */ '@/page/playlists')
const PlaylistDetail = () => import(/* webpackChunkName: "PlaylistDetail" */ '@/page/playlist-detail')
const Songs = () => import(/* webpackChunkName: "Discovery" */ '@/page/songs')
const Mvs = () => import(/* webpackChunkName: "Mvs" */ '@/page/mvs')

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
    component: Songs,
    meta: {
      title: '最新音乐',
      icon: 'yinyue'
    }
  },
  {
    path: '/mvs',
    name: 'mvs',
    component: Mvs,
    meta: {
      title: '最新MV',
      icon: 'mv'
    }
  }
]

// vue-router在重复push同一个路由的时候会报错，可以重置忽略错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
