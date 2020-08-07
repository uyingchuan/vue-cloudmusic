<template>
  <!-- 全局通用组件 Icon -->
  <div class="header">
    <div class="left">
      <div class="buttons">
        <div class="mac-button red">
          <Icon :size="9" type="home" />
        </div>
        <div class="mac-button yellow">
          <Icon :size="9" type="minus" />
        </div>
        <div class="mac-button green">
          <Icon :size="9" type="fullscreen" />
        </div>
      </div>
    </div>
    <div class="rigth">
      <div class="search-wrap"></div>
      <Theme />
    </div>
  </div>
</template>

<script>
import Theme from 'components/theme'

export default {
  components: {
    Theme
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  background-color: var(--header-bgcolor);
  background-color: #fff;
  padding-right: 36px;

  // @include el-input-theme(
  //   var(--header-input-color),
  //   var(--header-input-bgcolor),
  //   var(--header-input-placeholder-color)
  // );

  // 深度作用选择器，使样式影响子组件
  /deep/ .iconfont {
    color: var(--header-font-color);
  }

  .left {
    padding: 14px 14px 0 8px;
    display: flex;

    // .font-weight {
    //   white-space: nowrap;
    // }

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
          font-weight: $font-weight-blod;
          transform-origin: center center;
          font-size: 9px;
          transform: scale(0.75);
        }
      }
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
