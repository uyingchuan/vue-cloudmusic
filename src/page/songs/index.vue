// 最新音乐页面
<template>
  <div class="songs">
    <div class="tabs">
      <Tabs
        :tabs="tabs"
        @tabChange="getSongs"
        align="right"
        type="small"
        v-model="avtiveTabIndex"
      />
    </div>
    <SongTable :songs="songs" header-row-class-name="header-row" />
  </div>
</template>

<script>
export default {
    async created() {
        this.tabs = [
            { title: "全部", type: 0 },
            { title: "华语", type: 7 },
            { title: "欧美", type: 96 },
            { title: "日本", type: 8 },
            { title: "韩国", type: 16 },
        ]
    },
    data() {
        return {
            activeTabIndex: 0,
            songs: []
        }
    },
    methods: {},
    components: {}
}
</script>
