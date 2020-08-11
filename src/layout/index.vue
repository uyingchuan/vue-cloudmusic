<template>
  <div class="layout">
    <LayoutHeader />
    <div class="layout-body">
      <div class="layout-menu" v-show="isMenuShow">
        <LayoutMenu />
      </div>
      <div class="content" id="page-content">
        <router-view :class="routerViewCls" />
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutMenu from "./menu";
import { layoutCenterNames } from "@/router"

export default {
  data() {
    return {
      isMenuShow: true,
    }
  },
  components: {
    LayoutHeader,
    LayoutMenu,
  },
  computed: {
    routerViewCls() {
      return layoutCenterNames.find(name => name === this.$route.name)
        ? "router-view-center"
        : ""
    },
  }
};
</script>

<style lang="scss" scoped>
.layout {
    height: 100%;

    .layout-body {
      height: 100%;
      display: flex;

      .layout-menu {
        height: 100%;
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
