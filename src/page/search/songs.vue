// 搜索歌曲详情
<template>
    <div class="search-songs">
        <WithPagination
            :getData="getSearch"
            :limit="30"
            :getDataParams="searchParams"
            :scrollTarget="searchRoot.$refs && searchRoot.$refs.header"
            :total="songCount"
            @getDataSuccess="onGetSongs"
        >
            <div class="table">
                <SongTable
                    :songs="songs"
                    :highlightText="keywords"
                    :renderNameDesc="renderNameDesc"
                    :stripe="true"
                />
            </div>
        </WithPagination>
    </div>
</template>

<script>
import { getSearch } from '@/api'
import WithPagination from '@/components/with-pagination'
import SongTable from '@/components/song-table'
import { createSong } from '@/utils'

export default {
    inject: ["searchRoot"],
    created() {
        this.getSearch = getSearch
    },
    data() {
        return {
            songs: [],
            songCount: 0,
        }
    },
    methods: {
        onGetSongs(result) {
            const {
                result: { songs, songCount }
            } = result
            this.songs = songs.map(song => {
                const { id, mvid, name, alias, artists, duration, album } = song
                return createSong({
                    id,
                    name,
                    alias,
                    artists,
                    duration,
                    mvId: mvid,
                    albumName: album.name,
                    albumId: album.id
                })
            })
            this.songCount = songCount
            this.searchRoot.onUpdateCount(songCount)
        },
        renderNameDesc(scope) {
            const { alias } = scope.row
            return alias.map(desc => (
                <HighlightText
                    class="name-desc"
                    text={desc}
                    HighlightText={this.keywords}
                />
            ))
        }
    },
    computed: {
        keywords() {
            return this.searchRoot.keywords
        },
        searchParams() {
            return { keywords: this.keywords }
        }
    },
    components: {
        WithPagination, SongTable
    }
}
</script>

<style lang="scss" scoped>
.search-songs {
    .table {
        .name-desc {
            display: block;
            margin-top: 8px;
            color: var(--font-color-grey-shallow);
            @include text-ellipsis;
        }
    }
}
</style>
