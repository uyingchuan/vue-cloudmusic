// 歌单详情页面
<template>
  <div class="playlist-detail">
    <Header ref="header" :playlist="playlist" :songs="songs" />
    <div class="tabs-wrap">
      <Tabs :tabs="tabs" type="theme" v-model="activeTab" />
      <el-input
        :class="getInputCls()"
        @blur="onInputBlur"
        @focus="onInputFocus"
        class="input"
        placeholder="搜索歌单音乐"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        v-show="activeTab === SONG_IDX"
      ></el-input>
      <div class="empty" v-if="searchValue && !filteredSongs.length">
        未能找到和
        <span class="keyword">{{ searchValue }}</span>
        相关的任何音乐
      </div>
    </div>
  </div>
</template>
