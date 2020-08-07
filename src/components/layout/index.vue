<template>
  <div class="layout">
    <LayoutHeader />
    <div class="layout-body">
      <div class="layout-menu">
        <LayoutMenu />
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutMenu from "./menu";

export default {
  components: {
    LayoutHeader,
    LayoutMenu,
  },
};
</script>

<style lang="scss" scoped>
.layout {
    height: 100%;
}
</style>
