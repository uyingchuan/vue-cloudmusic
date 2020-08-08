<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
    </div>
  </div>
</template>

<script>
import Banner from "./banner";

export default {
  components: {
    Banner,
  },
};
</script>

<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
}
</style>
