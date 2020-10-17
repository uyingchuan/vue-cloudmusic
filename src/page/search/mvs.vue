// 搜索mv详情
<template>
    <div class="search-mvs">
        <WithPagination
            :getData="getSearch"
            :limit="40"
            :getDataParams="searchParams"
            :scrollTarget="searchRoot.$refs && searchRoot.$refs.header"
            :total="mvCount"
            @getDataSuccess="onGetMvs"
        >
            <ul class="list-wrap">
                <li class="list-item" v-for="(item, index) in mvs" :key="index">
                    <MvCard
                    :id="item.id"
                    :img="item.cover"
                    :duration="item.duration"
                    :playCount="item.playCount"
                    :name="item.name"
                    :author="item.artistsName"
                />
                </li>
            </ul>
        </WithPagination>
    </div>
</template>

<script>
import { getSearch } from '@/api'
import WithPagination from '@/components/with-pagination'
import MvCard from '@/components/mv-card'

const SEARCH_TYPE_MV = 1004
export default {
    inject: ["searchRoot"],
    created() {
        this.getSearch = getSearch
    },
    data() {
        return {
            mvCount: 0,
            mvs: []
        }
    },
    methods: {
        onGetMvs(result) {
            const { result: { mvs, mvCount } } = result
            this.mvs = mvs
            this.mvCount = mvCount
            this.searchRoot.onUpdateCount(mvCount)
        },
    },
    computed: {
        searchParams() {
            return { keywords: this.searchRoot.keywords, type: SEARCH_TYPE_MV}
        }
    },
    components: {
        WithPagination, MvCard
    }
}
</script>

<style lang="scss" scoped>
.search-mvs {
    max-width: 1000px;
    padding: $page-padding;
    margin: auto;

    @include list(25%)
}
</style>
