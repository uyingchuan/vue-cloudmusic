<template>
  <div class="search">
    <el-input
      placeholder="搜索"
      prefix-icon="el-icon-search"
      ref="input"
      v-model.trim="searchKeyword"
    >
    </el-input>
  </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {
            searchKeyword: "",
        }
    },
    methods: {},
    computed: {}
};
</script>

<style lang="scss" scoped>
.search {
    position: relative;
    width: 150px;

    // .search-panel {
    //     position: fixed;
    // }
}
</style>
