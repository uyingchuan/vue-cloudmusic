// 分页组件
<template>
  <div class="pagination" v-if="total > pageSize">
    <el-pagination
      :pageSize="pageSize"
      :total="total"
      layout="prev, pager, next"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: ['pageSize', 'total'],
  name: 'Pagination'
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: right;
}
</style>
