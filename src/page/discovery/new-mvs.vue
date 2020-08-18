// 推荐MV组件
<template>
  <div class="new-mvs" v-if="mvs.length">
    <Title>推荐MV</Title>
    <ul class="list-wrap">
      <li class="list-item" :key="mv.id" v-for="mv in mvs">
        <MvCard
          :id="mv.id"
          :img="mv.picUrl"
          :name="mv.name"
          :author="mv.artistName"
          :playCount="mv.playCount"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { getPersonalizedMv } from '@/api'
import MvCard from '@/components/mv-card'

export default {
  async created() {
    const { result } = await getPersonalizedMv()
    this.mvs = result
  },
  data() {
    return {
      mvs: []
    }
  },
  methods: {},
  components: {
    MvCard
  }
}
</script>

<style lang="scss" scoped>
.new-mvs {
  @include list(25%);
}
</style>
