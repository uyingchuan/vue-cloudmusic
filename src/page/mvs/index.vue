<template>
    <div class="mvs" ref="page">
        <div class="tabs-wrap">
            <span class="tabs-type">地区：</span>
            <Tabs :tabs="areaTabs" type="split" v-model="activeAreatabIndex" />
        </div>
        <div class="tabs-wrap">
            <span class="tabs-type">类型：</span>
            <Tabs :tabs="typeTabs" type="split" v-model="activeTypetabIndex" />
        </div>
        <div class="tabs-wrap">
            <span class="tabs-type">排序：</span>
            <Tabs :tabs="sortTabs" type="split" v-model="activeSorttabIndex" />
        </div>
        <!-- mv卡片 -->
        <div class="mv-crads">
            <ul class="list-wrap">
                <li class="list-item" v-for="mv in mvs" :key="mv.id">
                    <MvCard 
                        :id="mv.id"
                        :img="mv.cover"
                        :duration="mv.duration"
                        :playCount="mv.playCount"
                        :name="mv.name"
                        :author="mv.artistName"
                        />
                </li>
            </ul>
        </div>
        <!-- 分页 -->
        <Pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="mvCount"
            @current-change="onPageChange"
        />
    </div>
</template>

<script>
import MvCard from '@/components/mv-card'
import { getAllMvs } from '@/api'
import { getPageOffset, scrollInto } from '@/utils'

const areaTabs = ["全部", "内地", "港台", "欧美", "日本", "韩国"]
const typeTabs = ["全部", "官方版", "原声", "现场版", "网易出品"]
const sortTabs = ["上升最快", "最热", "最新"]
export default {
    created() {
        this.areaTabs = areaTabs
        this.typeTabs = typeTabs
        this.sortTabs = sortTabs
        this.getAllMvs = getAllMvs
        this.onPageChange()
    },
    data() {
        return {
            mvs: [],
            pageSize: 40,
            mvCount: 0,
            currentPage: 1,
            activeAreatabIndex: 0,
            activeSorttabIndex: 0,
            activeTypetabIndex: 0
        }
    },
    methods: {
        async onPageChange() {
            try {
                const result = await this.getAllMvs({
                    limit: this.pageSize,
                    offset: getPageOffset(this.currentPage, this.pageSize),
                    area: this.areaTabs[this.activeAreatabIndex],
                    order: this.sortTabs[this.activeSorttabIndex],
                    type: this.typeTabs[this.activeTypetabIndex]
                })
                this.mvs = result.data
                if (result.count) {
                this.mvCount = result.count
                }
                scrollInto(this.$refs && this.$refs.page)
            } catch (error) {
                return error
            }
        }
    },
    watch: {
        activeAreatabIndex: {
            handler() {
                this.currentPage = 1
                this.onPageChange()
            }
        },
        activeSorttabIndex: {
            handler() {
                this.currentPage = 1
                this.onPageChange()
            }
        },
        activeTypetabIndex: {
            handler() {
                this.currentPage = 1
                this.onPageChange()
            }
        }
    },
    components: {
        MvCard
    }
}
</script>

<style lang="scss" scoped>
.mvs {
    padding: $page-padding;
    margin: auto;

    .tabs-wrap {
        margin-bottom: 16px;
        display: flex;
        align-items: center;

        .tabs-type {
            font-size: $font-size-sm;
        }
    }

    @include list(25%)
}
</style>
