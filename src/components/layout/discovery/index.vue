<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
      <Recommend />
      <NewSongs />
      <NewMvs />
    </div>
  </div>
</template>

<script>
import Banner from "./banner";
import Recommend from "./recommend"
import NewSongs from "./new-songs"
import NewMvs from "./new-mvs"

export default {
  components: {
    Banner, Recommend, NewSongs, NewMvs
  },
};
</script>

<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
}
</style>
