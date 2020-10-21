// 歌单详情页面
<template>
  <div class="playlist-detail">
    <!-- 头部歌单信息 -->
    <Header ref="header" :playlist="playlist" :songs="songs" />
    <!-- 歌单 -->
    <div class="tabs-wrap">
      <!-- 选项卡，切换歌单和评论列表 -->
      <Tabs :tabs="tabs" type="theme" v-model="activeTab" />
      <!-- 搜索当前歌单 -->
      <el-input
        :class="getInputCls()"
        @blur="onInputBlur"
        @focus="onInputFocus"
        class="input"
        placeholder="搜索歌单音乐"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        v-show="activeTab === SONG_IDX"
      ></el-input>
    </div>
    <!-- 搜索结果为零时显示 -->
    <div class="empty" v-if="searchValue && !filteredSongs.length">
      未能找到和
      <span class="keyword">{{ searchValue }}</span>
      相关的任何音乐
    </div>
    <!-- 歌单列表 -->
    <SongTable
      :highlightText="searchValue"
      :songs="filteredSongs"
      class="table"
      v-show="activeTab === SONG_IDX"
    />
    <!-- 评论列表 -->
    <div class="comments" v-show="activeTab === COMMENT_IDX">
      <Comments :id="id" @update="onCommentsUpdate" type="playlist" />
    </div>
  </div>
</template>

<script>
import { getListDetail, getSongDetail } from '@/api'
import Header from './header'
import SongTable from '@/components/song-table'
import Comments from '@/components/comments'
import { createSong, scrollInto } from '@/utils'

const SONG_IDX = 0
const MAX = 500
const COMMENT_IDX = 1
export default {
  metaInfo() {
    return {
      title: this.playlist.name
    }
  },
  created() {
    this.SONG_IDX = SONG_IDX
    this.COMMENT_IDX = COMMENT_IDX
  },
  data() {
    return {
      playlist: {},
      songs: [],
      tabs: ['歌曲列表', '评论'],
      activeTab: SONG_IDX,
      searchValue: '',
      inputFocus: false
    }
  },
  methods: {
    async init() {
      const { playlist } = await getListDetail({ id: this.id })
      this.playlist = playlist
      this.getSonglist(playlist)
    },
    async getSonglist(playlist) {
      const trackIds = playlist.trackIds.map(({ id }) => id)
      const songDetails = await getSongDetail(trackIds.slice(0, MAX))
      const songs = songDetails.songs.map(({ id, name, al, ar, mv, dt }) =>
        createSong({
          id,
          name,
          artists: ar,
          duration: dt,
          mvId: mv,
          albumName: al.name,
          img: al.picUrl
        })
      )
      this.songs = songs
    },
    onCommentsUpdate({ total }) {
      this.tabs.splice(COMMENT_IDX, 1, `评论(${total})`)
    },
    onInputFocus() {
      this.inputFocus = true
    },
    onInputBlur() {
      this.inputFocus = false
    },
    getInputCls() {
      return !this.inputFocus ? 'inactive' : ''
    },
    scrollToHeader() {
      const { header } = this.$refs
      if (header) {
        scrollInto(header.$el)
      }
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id)
    },
    filteredSongs() {
      return this.songs.filter(({ name, artistsText, albumName }) =>
        `${name}${artistsText}${albumName}`.toLowerCase().includes(this.searchValue.toLowerCase())
      )
    }
  },
  watch: {
    // 该回调将会在侦听开始之后被立即调用
    id: {
      handler() {
        this.searchValue = ''
        this.init()
        this.scrollToHeader()
      },
      immediate: true
    }
  },
  components: {
    Header,
    SongTable,
    Comments
  }
}
</script>

<style lang="scss" scoped>
.playlist-detail {
  width: 100%;

  .tabs-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 24px;
    border-bottom: 1px solid var(--border);

    .input {
      width: 125px;

      &:not(:hover) {
        &.inactive {
          /deep/.el-input__inner {
            background: transparent !important;
          }
        }
      }
    }
  }

  .empty {
    @include flex-center;
    height: 200px;

    .keyword {
      color: $blue;
    }
  }

  .comments {
    padding: 16px 32px;
  }
}
</style>
