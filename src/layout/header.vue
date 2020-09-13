// 页面头部组件
<template>
  <div class="header">
    <!-- 左侧mac端按钮与history按钮 -->
    <div class="left">
      <!-- mac端三按钮 -->
      <div class="buttons">
        <div class="mac-button red" @click="onClickLogo">
          <Icon :size="9" type="home" />
        </div>
        <div class="mac-button yellow" @click="exitFullscreen">
          <Icon :size="9" type="minus" />
        </div>
        <div class="mac-button green" @click="fullScreen">
          <Icon :size="9" type="fullscreen" />
        </div>
      </div>
      <!-- history按钮 -->
      <div class="history" v-show="!isPlayerShow">
        <RoutesHistory />
      </div>
    </div>
    <!-- 右侧搜索栏与换肤按钮 -->
    <div class="rigth">
      <div class="search-wrap">
        <Search />
      </div>
      <Theme />
    </div>
  </div>
</template>

<script>
import Theme from '@/components/theme'
import Search from '@/components/search'
import RoutesHistory from '@/components/routes-history'
import { requestFullscreen, exitFullscreen, isFullScreen } from '@/utils'

export default {
  data() {
    return {
      isPlayerShow: false
    }
  },
  methods: {
    onClickLogo() {
      this.$router.push('/discovery')
    },
    fullScreen() {
      requestFullscreen(document.documentElement)
    },
    exitFullscreen() {
      if (isFullScreen()) {
        exitFullscreen()
      }
    }
  },
  components: {
    Theme,
    Search,
    RoutesHistory
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  background-color: var(--header-bgcolor);
  padding-right: 36px;

  // 深度作用选择器，使样式影响子组件
  /deep/ .iconfont {
    color: var(--header-font-color);
    font-size: 16px;
  }

  .left {
    padding: 14px 14px 0 8px;
    display: flex;

    .buttons {
      display: flex;

      &:hover {
        .mac-button > i {
          opacity: 1;
        }
      }

      .mac-button {
        @include round(12px);
        @include flex-center;
        margin-right: 8px;
        cursor: pointer;

        &.red {
          background-color: #ed655a;
        }

        &.green {
          background-color: #72be47;
        }

        &.yellow {
          background-color: #e0c04c;
        }

        i {
          opacity: 0;
          transition: opacity 0.3s;
          color: $black;
          font-weight: $font-weight-bold;
          transform-origin: center center;
          font-size: 9px;
          transform: scale(0.75);
        }
      }
    }

    .history {
      margin-left: 65px;
    }
  }

  .rigth {
    display: flex;
    align-items: center;

    .search-wrap {
      margin-right: 16px;
    }
  }
}
</style>
