// 推荐歌单组件
<template>
  <div class="recommend">
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <PlaylistCard
        :desc="item.copywriter"
        :id="item.id"
        :img="item.picUrl"
        :key="item.id"
        :name="item.name"
        v-for="item in list"
      />
    </div>
  </div>
</template>

<script>
import PlaylistCard from "@/components/playlist-card";
import { getPersonalized } from "@/api";

export default {
  async created() {
    const { result } = await getPersonalized({ limit: 10 });
    this.list = result;
  },
  data() {
    return {
      list: [],
    };
  },
  components: {
    PlaylistCard,
  },
};
</script>

<style lang="scss" scoped>
.list-wrap {
    display: flex;
    margin: 0 -4px;
    flex-wrap: wrap;
}
</style>
