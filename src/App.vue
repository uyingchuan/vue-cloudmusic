<template>
  <div id="app">
    <Layout />
    <MiniPlayer />
  </div>
</template>

<script>
import Layout from '@/layout'
import MiniPlayer from '@/components/mini-player'

export default {
  metaInfo() {
    return {
      title: '欢迎来到cloudmusic'
    }
  },
  components: {
    Layout, MiniPlayer
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