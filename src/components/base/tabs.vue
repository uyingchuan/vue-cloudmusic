<template>
  <ul class="tabs-wrap" v-if="{ [align]: true }">
    <template v-if="isRouteMode">
      <router-link
        class="tab-item"
        :active-class="`${ROUTE_ACTIVE_CLS} ${activeItemClass}`"
        :key="index"
        :style="getItemStyle(tab, index)"
        :to="tab.to"
        ref="routerLinks"
        tag="li"
        v-for="(tab, index) in normalizedTabs"
      >
        <span class="title">{{ tab.title }}</span>
      </router-link>
    </template>
    <template v-else>
      <li
        class="tab-item"
        :class="getItemCls(tab, index)"
        :key="index"
        :style="getItemStyle(tab, index)"
        @click="onChangeTab(tab, index)"
        v-for="(tab, index) in normalizedTabs"
      >
        <span class="title">{{ tab.title }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
const ACTIVE_PROP = 'active'
const ACTIVE_CHANGE = 'tabChange'
const ROUTE_ACTIVE_CLS = 'active'

export default {
    name: 'Tabs',
    props: {
        [ACTIVE_PROP]: {
            type: Number,
            default: 0
        },
        tabs: {
            type: Array,
            default: () => []
        },
        align: {
            type: String,
            default: 'left'
        },
        itemStyle: {
            type: Object,
            default: () => ({})
        },
        activeItemStyle: {
            type: Object,
            default: () => ({})
        },
        itemClass: {
            type: String
        },
        activeItemClass: {
            type: String
        },
        type: {
            type: String
        }
    },
    model: {
        prop: ACTIVE_PROP,
        event: ACTIVE_CHANGE
    },
    created() {
        this.ROUTE_ACTIVE_CLS = ROUTE_ACTIVE_CLS
    },
    methods: {
        onChangeTab(tab, index) {
            if (this.isRouteMode) {
                this.$router.push(tab.to)
            } else {
                this.$emit(ACTIVE_CHANGE, index)
            }
        },
        isActive(tab, index) {
            // 路由模式
            if (this.isRouteMode) {
                const {
                    resolved: { path: resolvedPath }
                } = this.$router.resolve(tab.to)
                return resolvedPath === this.$router.path
            } else {
                return index === this[ACTIVE_PROP]
            }
        },
        getItemCls(tab, index) {
            let base = []
        }
    }
}
</script>
