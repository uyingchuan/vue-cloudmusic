<template>
  <div class="layout">
    <!-- 页面头部 -->
    <LayoutHeader />
    <!-- 页面主体 -->
    <div class="layout-body">
      <!-- 页面菜单 -->
      <div class="layout-menu">
        <LayoutMenu />
      </div>
      <!-- 页面主内容区域 -->
      <div class="content" id="page-content">
        <router-view :class="routerViewCls" />
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from './header'
import LayoutMenu from './menu'
import { layoutCenterNames } from '@/router'

export default {
  components: {
    LayoutHeader,
    LayoutMenu
  },
  computed: {
    routerViewCls() {
      // 判断是否为已定义需在内容区居中的页面
      return layoutCenterNames.find(name => name === this.$route.name) ? 'router-view-center' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;

  .layout-body {
    height: calc(100% - #{$header-height});
    display: flex;

    .layout-menu {
      height: calc(100% - #{$mini-player-height});
    }

    .content {
      flex: 1;
      overflow-y: auto;
      min-width: $layout-content-min-width;
      margin-bottom: $mini-player-height;

      .router-view-center {
        max-width: $center-content-max-width;
        margin: auto;
      }
    }
  }
}
</style>
