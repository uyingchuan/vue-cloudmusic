<template>
  <div class="playlist-card" @click="onClickCard">
    <div class="img-wrap">
      <img v-lazy="$utils.getImgUrl(img, 300)" />
      <div class="desc-wrap">
        <span class="desc">{{ desc }}</span>
      </div>
      <PlayIcon :size="36" class="play-icon" />
    </div>
    <p class="name">{{ name }}</p>
  </div>
</template>

<script>
export default {
    props: ["id", "img", "name", "desc"],
    methods: {
      onClickCard() {
        this.$router.push(`/playlist/${this.id}`)
      }
    },
}
</script>

<style lang="scss" scoped>
.playlist-card {
  position: relative;
  width: calc(20% - 8px);
  margin: 4px;
  margin-bottom: 32px;
  cursor: pointer;

  .img-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 8px;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }

    .desc-wrap {
      position: absolute;
      padding: 6px;
      left: 0;
      right: 0;
      top: 0;
      background: rgba($color: #000, $alpha: 0.4);
      transform: translateY(-100%);
      transition: all 0.3s;

      .desc {
        color: $white;
        font-size: $font-size-sm;
      }
    }

    .play-icon {
      opacity: 0;
      position: absolute;
      right: 4px;
      bottom: 4px;
      font-size: 24px;
      transition: all 0.3s;
      color: $white;
    }

    &:hover {
      .desc-wrap {
        transform: translateY(0);
      }

      .play-icon {
        opacity: 1;
      }
    }
  }

  .name {
    font-size: $font-size-sm;
    @include text-ellipsis();
  }
}
</style>
