<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
      <Recommend />
      <NewSongs />
    </div>
  </div>
</template>

<script>
import Banner from "./banner";
import Recommend from "./recommend"
import NewSongs from "./new-songs"

export default {
  components: {
    Banner, Recommend, NewSongs
  },
};
</script>

<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
}
</style>
