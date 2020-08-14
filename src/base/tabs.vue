<template>
  <ul class="tabs-wrap" :class="{ [align]: true }">
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
const ACTIVE_PROP = "active";
const ACTIVE_CHANGE = "tabChange";
const ROUTE_ACTIVE_CLS = "active";

export default {
  name: "Tabs",
  props: {
    [ACTIVE_PROP]: {
      type: Number,
      default: 0,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    align: {
      type: String,
      default: "left",
    },
    itemStyle: {
      type: Object,
      default: () => ({}),
    },
    activeItemStyle: {
      type: Object,
      default: () => ({}),
    },
    itemClass: {
      type: String,
    },
    activeItemClass: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  model: {
    prop: ACTIVE_PROP,
    event: ACTIVE_CHANGE,
  },
  created() {
    this.ROUTE_ACTIVE_CLS = ROUTE_ACTIVE_CLS;
  },
  methods: {
    onChangeTab(tab, index) {
      if (this.isRouteMode) {
        this.$router.push(tab.to);
      } else {
        this.$emit(ACTIVE_CHANGE, index);
      }
    },
    isActive(tab, index) {
      // 路由模式
      if (this.isRouteMode) {
        const {
          resolved: { path: resolvedPath },
        } = this.$router.resolve(tab.to);
        return resolvedPath === this.$router.path;
      } else {
        return index === this[ACTIVE_PROP];
      }
    },
    getItemCls(tab, index) {
      let base = [];
    },
    getItemStyle(tab, index) {
      return Object.assign(
        {},
        this.itemStyle,
        this.isActive(tab, index)
          ? Object.assign({}, this.activeItemStyle)
          : null
      );
    },
  },
  computed: {
    isRouteMode() {
      return (
        this.tabs.length &&
        this.tabs[0].to !== undefined &&
        this.tabs[0].to !== null
      );
    },
    normalizedTabs() {
      return typeof this.tabs[0] == "string"
        ? this.tabs.map((tab) => ({ title: tab }))
        : this.tabs;
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-wrap {
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
          counter: "";
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
