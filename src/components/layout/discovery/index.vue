<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
      <Recommend />
    </div>
  </div>
</template>

<script>
import Banner from "./banner";
import Recommend from "./recommend"

export default {
  components: {
    Banner, Recommend
  },
};
</script>

<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
}
</style>
