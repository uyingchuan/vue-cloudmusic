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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  // background-color: var(--header-bgcolor);
  background-color: #fff;
  padding-right: 36px;

  // @include

  .left {
    padding: 14px 14px 0 8px;
    display: flex;

    // .font-weight {

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
          transform: opacity 0.3s;
          color: $black;
          font-weight: $font-weight-blod;
          transform-origin: center center;
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
