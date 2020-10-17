// 搜索歌单详情
<template>
  <div class="search-playlists">
    <WithPagination
      :getData="getSearch"
      :limit="30"
      :getDataParams="searchParams"
      :scrollTarget="searchRoot.$refs && searchRoot.$refs.header"
      :total="playlistCount"
      @getDataSuccess="onGetPlaylists"
    >
      <div class="list-wrap">
        <PlaylistCard
          :id="item.id"
          :img="item.coverImgUrl"
          :name="item.name"
          :desc="item.desc"
          :key="index"
          v-for="(item, index) in playlists"
        />
      </div>
    </WithPagination>
  </div>
</template>

<script>
import { getSearch } from '@/api'
import WithPagination from '@/components/with-pagination'
import PlaylistCard from '@/components/playlist-card'

const SEARCH_TYPE_PLALIST = 1000
export default {
  inject: ['searchRoot'],
  created() {
    this.getSearch = getSearch
  },
  data() {
    return {
      playlistCount: 0,
      playlists: []
    }
  },
  methods: {
    onGetPlaylists(result) {
      const {
        result: { playlists, playlistCount }
      } = result
      this.playlists = playlists
      this.playlistCount = playlistCount
      this.searchRoot.onUpdateCount(playlistCount)
    }
  },
  computed: {
    searchParams() {
      return { keywords: this.searchRoot.keywords, type: SEARCH_TYPE_PLALIST }
    }
  },
  components: {
    WithPagination,
    PlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.search-playlists {
  max-width: 1000px;
  padding: $page-padding;
  margin: auto;

  .list-wrap {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
