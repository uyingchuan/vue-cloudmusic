<template>
  <Toggle :show="isPlaylistShow" :reserveDoms="reserveDoms" @update:show="setPlaylistShow(false)">
      <div class="playlist" v-show="isPlaylistShow">
          <Tabs :tabs="tabs" align="center" v-model="activeTab" />
          <div class="header">
              <p class="total">总共{{dataSource.length}}首</p>
              <div class="remove" v-if="dataSource.length" @click="clear">
                  <Icon type="remove" />
                  <span class="text">清空</span>
              </div>
          </div>
          <template>
              <div class="song-table-wrap" v-if="dataSource.length">
                  <SongTable :songs="dataSource" :hideColumns="['index', 'img', 'albumnName']" />
              </div>
              <div class="empty" v-else>你还没有添加任何歌曲</div>
          </template>
      </div>
  </Toggle>
</template>

<script>
import { mapState, mapActions, mapMutations } from "@/store/helper/music"
import SongTable from "@/components/song-table"

export default {
    mounted() {
        this.reserveDoms = [document.getElementById('mini-player')]
    },
    data() {
        this.tabs = ["播放列表", "播放历史"]
        this.LIST_TAB = 0
        return {
            activeTab: 0,
            reserveDoms: null,
        }
    },
    methods: {
        clear() {
            if (this.isPlaylist) {
                this.clearPlaylist()
            } else {
                this.clearHistory()
            }
        },
        ...mapMutations(["setPlaylistShow"]),
        ...mapActions(["clearPlaylist", "clearHistory"]),
    },
    computed: {
        dataSource() {
            return this.isPlaylist ? this.playlist : this.playHistory
        },
        isPlaylist() {
            return this.activeTab === this.LIST_TAB
        },
        ...mapState(["isPlaylistShow", "playlist", "playHistory"]),
    },
    components: {
        SongTable
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/element-overwrite.scss";

.playlist {
    position: fixed;
    right: 0;
    top: 0;
    width: 400px;
    bottom: $mini-player-height;
    display: flex;
    flex-direction: column;
    background: var(--playlist-bgcolor);
    z-index: $playlist-z-index;
    @include box-shadow;
    @include el-table-theme(var(--playlist-bgcolor));

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        margin: 0 20px;
        border-bottom: 1px solid var(--border);

        .total {
            font-size: $font-size-sm;
        }

        .remove {
            @include flex-center;
            cursor: pointer;
            font-size: $font-size-sm;

            .text {
                display: inline-block;
                margin-left: 4px;
            }
        }
    }

    .song-table-wrap {
        flex: 1;
        overflow-y: auto;
    }

    .empty {
        @include flex-center();
        flex: 1;
    }
}
</style>
