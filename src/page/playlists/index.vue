// 推荐歌单页面
<template>
  <div ref="playlists" class="playlists">
    <!-- 头部歌单卡片 -->
    <div class="playlist-top-card" v-if="topPlaylist.id">
      <PlaylistTopCard
        :desc="topPlaylist.description"
        :id="topPlaylist"
        :img="topPlaylist.coverImgUrl"
        :name="topPlaylist.name"
      />
    </div>
    <!-- 歌单tabs -->
    <div class="tabs">
      <Tabs
        :tabs="tabs"
        @tabChange="onTabChange"
        align="right"
        type="small"
        v-model="activeTabIndex"
      />
    </div>
    <!-- 歌单列表卡片 -->
    <!-- 不同风格歌单列表有相同歌单，为避免key值重复修改key -->
    <div class="playlist-cards">
      <PlaylistCard
        :desc="`播放量：${$utils.formatNumber(item.playCount)}`"
        :id="item.id"
        :img="item.coverImgUrl"
        :key="item.id + ' ' + index"
        :name="item.name"
        v-for="(item, index) in playlists"
      />
    </div>
    <!-- 底部页码 -->
    <Pagination
      :current-page.sync="currentPage"
      :page-size="PAGE_SIZE"
      :total="total"
      @current-change="onPageChange"
      class="pagination"
    />
  </div>
</template>

<script>
import PlaylistTopCard from '@/components/playlist-top-card'
import PlaylistCard from '@/components/playlist-card'
import { getTopPlaylists, getPlaylists } from '@/api'
import { getPageOffset, scrollInto } from '@/utils'

const PAGE_SIZE = 50
export default {
  created() {
    this.PAGE_SIZE = PAGE_SIZE
    this.tabs = [
      '全部',
      '欧美',
      '华语',
      '流行',
      '说唱',
      '摇滚',
      '民谣',
      '电子',
      '轻音乐',
      '影视原声',
      'ACG',
      '怀旧',
      '治愈',
      '旅行'
    ]
    this.initData()
  },
  data() {
    return {
      // 顶部精品歌单
      topPlaylist: {},
      // 当前选中 tab
      activeTabIndex: 0,
      // 获取到的歌单
      playlists: [],
      // 当前页码
      currentPage: 0,
      // 歌单总数
      total: 0
    }
  },
  methods: {
    async initData() {
      this.getTopPlaylists()
      this.getPlaylists()
    },
    // 获取歌单列表
    async getPlaylists() {
      const { playlists, total } = await getPlaylists({
        limit: PAGE_SIZE,
        offset: getPageOffset(this.currentPage, PAGE_SIZE),
        cat: this.tabs[this.activeTabIndex]
      })
      this.playlists = playlists
      this.total = total
    },
    // 获取顶部歌单
    async getTopPlaylists() {
      const { playlists } = await getTopPlaylists({
        limit: 1,
        cat: this.tabs[this.activeTabIndex]
      })
      this.topPlaylist = playlists[0] || {}
    },
    // 翻页
    async onPageChange(page) {
      this.currentPage = page
      this.getPlaylists()
      scrollInto(this.$refs.playlists)
    },
    // 点击选项卡
    onTabChange() {
      this.initData()
    }
  },
  components: {
    PlaylistTopCard,
    PlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.playlists {
  padding: 12px;

  .playlist-top-card {
    margin-bottom: 16px;
  }

  .playlist-cards {
    display: flex;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 36px;
  }
}
</style>
