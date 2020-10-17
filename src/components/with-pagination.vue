<template>
    <div class="with-pagination">
        <slot></slot>
        <div class="pagination-wrap">
            <Pagination
                :page-size="limit"
                :total="total"
                :current-page.sync="currentPage"
                @current-change="onPageChange"
                class="pagination"
            ></Pagination>
        </div>
    </div>
</template>

<script>
import { getPageOffset, scrollInto } from '@/utils'

export default {
    props: {
        getData: {
            type: Function,
            required: true
        },
        limit: {
            type: Number,
            default: 10
        },
        getDataParams: {
            type: Object,
            default: () => ({})
        },
        scrollTarget: {
            type: HTMLElement
        },
        total: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.onPageChange()
    },
    data() {
        return {
            currentPage: 1
        }
    },
    methods: {
        async onPageChange() {
            try {
                const result = await this.getData({
                    limit: this.limit,
                    offset: getPageOffset(this.currentPage, this.limit),
                    ...this.getDataParams
                })
                this.$emit("getDataSuccess", result)
                // 父组件传入滚动目标，则分页后自动滚动
                if (this.scrollTarget) {
                    scrollInto(this.scrollTarget)
                }
            } catch (error) {
                this.$emit("getDataError", error)
            }
        }
    },
    watch: {
        getDataParams: {
            deep: true,
            handler() {
                this.currentPage = 1
                this.onPageChange()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination-wrap {
    margin-top: 16px;
}
</style>
