// 页面左侧菜单区域
<template>
  <div class="menu">
    <!-- 用户 -->
    <User />

    <!-- 默认菜单与用户私有歌单 -->
    <div class="menu-wrap">
      <!-- 菜单根据路由传入数据与登录后数据计算得到的menusWithPlaylist数组渲染 -->
      <div class="menu-block" v-for="(menu, index) in menusWithPlaylist" :key="index">
        <!-- 登录后菜单分几个组 -->
        <p class="menu-block-title" v-if="menu.title">{{ menu.title }}</p>
        <ul class="menu-list">
          <!-- tag属性表示router-link渲染后的标签名 -->
          <router-link
            :key="index"
            :to="item.path"
            active-class="menu-item-active"
            class="menu-item"
            tag="li"
            v-for="(item, index) in menu.children"
          >
            <Icon :size="16" :type="item.meta.icon" class="iconfont" />
            <span class="menu-title">{{ item.meta.title }}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { menuRoutes } from '@/router'
import User from '@/components/user'
import { mapState, mapGetters } from '@/store/helper/user'

export default {
  data() {
    return {
      menus: [
        {
          type: 'root',
          children: menuRoutes
        }
      ]
    }
  },
  computed: {
    // 登录歌单与默认歌单组合
    menusWithPlaylist() {
      return this.isLogin && this.userMenus.length
        ? this.menus.concat(this.userMenus) 
        : this.menus
    },
    ...mapState(["userPlaylist"]),
    ...mapGetters(["isLogin", "userMenus"])
  },
  components: {
    User
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--menu-bgcolor);
  color: var(--font-color);

  .menu-wrap {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;

    .menu-block {
      margin-bottom: 16px;

      .menu-block-title {
        font-size: $font-size-sm;
        color: var(--font-color-grey2);
        padding-left: 16px;
        margin-bottom: 8px;
      }

      .menu-list {
        .menu-item {
          @include text-ellipsis;
          padding: 12px 18px;
          cursor: pointer;

          &:hover {
            background: var(--menu-item-hover-bgcolor);
          }

          &-active {
            color: $theme-color;
            background: var(--menu-item-active-bgcolor);

            // i {
            //   color: $theme-color;
            // }
          }

          /deep/.iconfont {
            font-size: $font-size-medium-sm + 3px;
          }

          .menu-title {
            font-size: $font-size-medium-sm;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
