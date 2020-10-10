<template>
  <div id="app">
    <!-- 头部 左侧按钮组件 -->
    <Layout />
    <!-- 歌曲详情页 -->
    <Player />
    <!-- 下方播放器组件 -->
    <MiniPlayer />
  </div>
</template>

<script>
import Layout from '@/layout'
import MiniPlayer from '@/components/mini-player'
import Player from '@/components/player'

export default {
  // 使用vue-meta控制页面title
  metaInfo() {
    return {
      title: '欢迎来到cloudmusic'
    }
  },
  components: {
    Layout,
    MiniPlayer,
    Player
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  background: var(--body-bgcolor);
  font-size: $font-size;
}
</style>
