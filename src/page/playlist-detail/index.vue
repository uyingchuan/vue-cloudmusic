// 歌单详情页面
<template>
  <div class="playlist-detail">
    <Header ref="header" :playlist="playlist" :songs="songs" />
    <div class="tabs-wrap">
      <Tabs :tabs="tabs" type="theme" v-model="activeTab" />
      <el-input
        :class="getInputCls"
        @blur="onInputBlur"
        @focus="onInputFocus"
        class="input"
        placeholder="搜索歌单音乐"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        v-show="activeTab === SONG_IDX"
      ></el-input>
      <div class="empty" v-if="searchValue && !filteredSongs.length">
        未能找到和
        <span class="keyword">{{ searchValue }}</span>
        相关的任何音乐
      </div>
    </div>
  </div>
</template>

<script>
import { getListDetail, getSongDetail } from "@/api";

const SONG_IDX = 0;
export default {
  created() {
    this.SONG_IDX = SONG_IDX;
  },
  data() {
    return {
      playlist: {},
      songs: [],
      tabs: [],
      activeTab: {},
    };
  },
  methods: {
    async init() {
      const { playlist } = await getListDetail({ id: this.id });
      this.playlist = playlist;
    },
    getSongList() {},
  },
  computed: {
    id() {
      return Number(this.$router.params.id);
    },
    getInputCls() {},
  },
};
</script>

<style lang="scss" scoped></style>
