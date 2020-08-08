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
    routerViewCls() {},
  }
};
</script>

<style lang="scss" scoped>
.layout {
    height: 100%;

    .layout-body {
      height: 100%;

      .layout-menu {
        height: 100%;
      }
    }
}
</style>
