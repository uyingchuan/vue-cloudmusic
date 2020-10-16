<template>
  <div class="search">
    <el-input
      placeholder="搜索"
      prefix-icon="el-icon-search"
      ref="input"
      @click.native="onClickInput"
      @keypress.native.enter="onEnterPress"
      @input="onInput"
      v-model.trim="searchKeyword"
    >
    </el-input>
    <Toggle :show.sync="searchPanelShow" :reserveDoms="[$refs.input && $refs.input.$el]">
      <div class="search-panel" v-show="searchPanelShow">
        <!-- search-suggest -->
        <div class="search-suggest" v-if="suggestShow">
          <div
            class="suggest-item"
            v-for="(normalizedSuggest, index) in normalizedSuggests"
            :key="index"
          >
            <div class="title">
              <Icon :size="12" :type="normalizedSuggest.icon" />
              {{ normalizedSuggest.title }}
            </div>
            <ul class="list">
              <li
                class="item"
                v-for="item in normalizedSuggest.data"
                :key="item.id"
                @click="normalizedSuggest.onClick(item)"
              >
                <HighlightText
                  :highlightText="searchKeyword"
                  :text="
                    normalizedSuggest.renderName ? normalizedSuggest.renderName(item) : item.name
                  "
                />
              </li>
            </ul>
          </div>
        </div>
        <!-- search keys -->
        <div class="suggest-hots" v-else>
          <!-- 热门搜索 -->
          <div class="block">
            <p class="title">热门搜索</p>
            <div class="tags">
              <Button
                class="button"
                @click="onClickHot(hot)"
                v-for="(hot, index) in searchHots"
                :key="index"
                >{{ hot.first }}</Button
              >
            </div>
          </div>
          <!-- 搜索历史 -->
          <div class="block">
            <p class="title">搜索历史</p>
            <div class="tags" v-if="searchHistorys.length">
              <Button
                class="button"
                @click="onClickHot(history)"
                v-for="(history, index) in searchHistorys"
                :key="index"
                >{{ history.first }}</Button
              >
            </div>
            <div class="empty" v-else>暂无搜索历史</div>
          </div>
        </div>
      </div>
    </Toggle>
  </div>
</template>

<script>
import storage from 'good-storage'
import { debounce, getArtistsText, createSong } from '@/utils'
import { getSearchHot, getSearchSuggest } from '@/api'
import { mapActions } from '@/store/helper/music'

const SEARCH_HISTORY_KEY = '__search_history__'
export default {
  async created() {
    const {
      result: { hots }
    } = await getSearchHot()
    this.searchHots = hots
  },
  data() {
    return {
      searchKeyword: '',
      searchPanelShow: false,
      searchHistorys: storage.get(SEARCH_HISTORY_KEY, []),
      suggest: {},
      searchHots: []
    }
  },
  methods: {
    onClickInput() {
      this.searchPanelShow = true
    },
    onClickHot(hot) {
      const { first } = hot
      this.goSearch(first)
    },
    onEnterPress() {
      if (this.searchKeyword) {
        this.goSearch(this.searchKeyword)
      }
    },
    onInput: debounce(function(value) {
      if (!value.trim()) {
        return
      }
      getSearchSuggest(value).then(({ result }) => {
        this.suggest = result
      })
    }, 500),
    goSearch(keyword) {
      this.searchHistorys.push({ first: keyword })
      storage.set(SEARCH_HISTORY_KEY, this.srearchHistory)
      this.searchPanelShow = false
    },
    async onClickSong(item) {
      const {
        id,
        name,
        artists,
        duration,
        mvid,
        album: { id: albumId, name: albumName }
      } = item
      const song = createSong({
        id,
        name,
        artists,
        duration,
        albumId,
        albumName,
        mvId: mvid
      })
      this.startSong(song)
      this.addToPlaylist(song)
    },
    onClickPlaylist(item) {
      const { id } = item
      this.$router.push(`/playlist/${id}`)
      this.searchPanelShow = false
    },
    onClickMv(mv) {
      const { id } = mv
      this.$router.push(`/mv/${id}`)
    },
    ...mapActions(['startSong', 'addToPlaylist'])
  },
  computed: {
    suggestShow() {
      return (
        this.searchKeyword.length &&
        ['songs', 'playlist'].find(key => {
          return this.suggest[key] && this.suggest[key].length
        })
      )
    },
    normalizedSuggests() {
      return [
        {
          title: '单曲',
          icon: 'music',
          data: this.suggest.songs,
          renderName(song) {
            return `${song.name} - ${getArtistsText(song.artists)}`
          },
          onClick: this.onClickSong.bind(this)
        },
        {
          title: '歌单',
          icon: 'playlist',
          data: this.suggest.playlists,
          onClick: this.onClickPlaylist.bind(this)
        },
        {
          title: 'mv',
          icon: 'mv',
          data: this.suggest.mvs,
          renderName(mv) {
            return `${mv.name} - ${getArtistsText(mv.artists)}`
          },
          onClick: this.onClickMv.bind(this)
        }
      ].filter(item => item.data && item.data.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 150px;

  .search-panel {
    position: fixed;
    top: $header-height;
    right: 0;
    bottom: $mini-player-height;
    width: 350px;
    background: var(--search-bgcolor);
    z-index: $search-panel-z-index;
    overflow-y: auto;
    font-size: $font-size-sm;
    @include box-shadow;

    .suggest-item {
      margin-bottom: 16px;

      .title {
        margin: 16px 8px 8px;
        color: var(--font-color-grey-shallow);
      }

      .list {
        .item {
          padding: 12px 24px;
          cursor: pointer;
          @include text-ellipsis();

          &:hover {
            background: var(--light-bgcolor);
          }
        }
      }
    }

    .block {
      padding: 16px 24px;

      .title {
        color: var(--font-color-grey);
        margin-bottom: 16px;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;

        .button {
          margin-bottom: 12px;
          margin-right: 6px;
          font-size: $font-size-sm;
        }
      }

      .empty {
        @include flex-center();
        color: var(--font-color-grey);
        font-size: $font-size;
        height: 100px;
      }
    }
  }
}
</style>
