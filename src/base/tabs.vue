<template>
  <ul class="tab-wrap" :class="{ [align]: true }">
    <!-- 传入tabs自带to属性可实现导航 -->
    <template v-if="isRouteMode">
      <router-link
        class="tab-item"
        :active-class="`${ROUTE_ACTIVE_CLS} ${activeItemClass}`"
        :key="index"
        :to="tab.to"
        ref="routerLinks"
        tag="li"
        v-for="(tab, index) in normalizedTabs"
      >
        <span class="title">{{ tab.title }}</span>
      </router-link>
    </template>
    <!-- 否则手动实现click导航 -->
    <template v-else>
      <li
        class="tab-item"
        :class="getItemCls(tab, index)"
        :key="index"
        @click="onChangeTab(tab, index)"
        v-for="(tab, index) in normalizedTabs"
      >
        <span class="title">{{ tab.title }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
import { isDef } from '@/utils'

const ACTIVE_PROP = 'active'
const ACTIVE_CHANGE = 'tabChange'
const ROUTE_ACTIVE_CLS = 'active'

export default {
  name: 'Tabs',
  props: {
    // ACTIVE_CHANGE事件模板中绑定的数据
    [ACTIVE_PROP]: {
      type: Number,
      default: 0
    },
    // 需要渲染的选项卡数组
    tabs: {
      type: Array,
      default: () => []
    },
    // 排列方式
    align: {
      type: String,
      default: 'left'
    },
    // 传入父组件定义的tab样式名
    itemClass: {
      type: String
    },
    // 传入父组件定义的tab选中样式名
    activeItemClass: {
      type: String
    },
    // tabs的类型
    // default, small, theme, split四种
    type: {
      type: String
    }
  },
  // 定制v-model，实现自定义事件的v-model
  model: {
    prop: ACTIVE_PROP,
    event: ACTIVE_CHANGE
  },
  created() {
    this.ROUTE_ACTIVE_CLS = ROUTE_ACTIVE_CLS
  },
  methods: {
    // 点击tab，将ACTIVE_CHANGE事件传递给父组件
    onChangeTab(tab, index) {
      // if (this.isRouteMode) {
      //   this.$router.push(tab.to)
      // } else {
      this.$emit(ACTIVE_CHANGE, index)
      // }
    },
    // 判断是否被选中
    isActive(tab, index) {
      // 路由模式
      if (this.isRouteMode) {
        // resolve会返回一个跳转路由对象
        const {
          resolved: { path: resolvedPath }
        } = this.$router.resolve(tab.to)
        return resolvedPath === this.$route.path
      } else {
        return index === this[ACTIVE_PROP]
      }
    },
    // 根据情况给tab添加class
    getItemCls(tab, index) {
      let base = []
      if (this.itemClass) {
        base.push(this.itemClass)
      }
      if (this.type) {
        base.push(this.type)
      }
      if (this.isActive(tab, index)) {
        if (this.activeItemClass) {
          base.push(this.activeItemClass)
        } else {
          base.push('active')
        }
      }
      return base.join(' ')
    }
  },
  computed: {
    isRouteMode() {
      return this.tabs.length && isDef(this.tabs[0].to)
    },
    normalizedTabs() {
      return typeof this.tabs[0] == 'string' ? this.tabs.map(tab => ({ title: tab })) : this.tabs
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-wrap {
  display: flex;

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  .tab-item {
    padding: 12px 0;
    margin: 0 12px;
    color: var(--tab-item-color);
    font-size: $font-size-medium;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      color: var(--tab-item-active-color);

      &:hover {
        color: var(--tab-item-active-color);
      }
    }

    &.small {
      font-size: $font-size-sm;

      &.active {
        color: $theme-color;
      }
    }

    &.theme {
      font-size: $font-size;

      &.active {
        color: $theme-color;
        border-bottom: 2px solid $theme-color;
        font-weight: $font-weight-bold;
      }
    }

    &.split {
      font-size: $font-size-sm;
      padding: 4px 12px;
      margin: 0 16px;
      border-radius: 999em;

      &.active {
        color: $theme-color;
        background: var(--shallow-theme-bgcolor);
      }

      &:not(:last-child) {
        &::after {
          position: relative;
          left: 28px;
          width: 1px;
          height: 100%;
          background: var(--border);
          display: inline-block;
          vertical-align: middle;
          content: '';
        }

        .title {
          vertical-align: middle;
        }
      }
    }

    &:hover {
      color: var(--tab-item-hover-color);
    }
  }
}
</style>
