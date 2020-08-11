// 底部播放器组件
<template>
  <div class="mini-player" id="mini-player">
    <!-- song -->
    <div class="song"></div>
    <!-- 控制台 -->
    <div class="control">
      <Icon :size="24" class="icon" type="prev" />
      <el-popover
        :value="isPlayErrorPromptShow"
        trigger="manual"
        placement="top"
        width="160"
      >
        <div class="play-icon" slot="reference">
          <Icon :size="24" :type="playIcon" />
        </div>
      </el-popover>
      <Icon :size="24" class="icon" type="next" />
    </div>
    <!-- 右侧按钮部分 -->
    <div class="mode">
      <!-- 播放模式 -->
      <el-popover placement="top" trigger="hover" width="160">
        <p>{{ playModeText }}</p>
        <Icon :size="20" :type="modeIcon" class="mode-item" slot="reference" />
      </el-popover>
      <!-- 播放列表 -->
      <el-popover>
        <p></p>
        <Icon :size="20" class="mode-item" slot="reference" type="playlist" />
      </el-popover>
      <!-- 音量 -->
      <div class="volume-item">
        <div class="block"></div>
      </div>
      <!-- github -->
      <Icon :size="20" class="mode-item" type="github" />
    </div>
    <!-- 播放进度条 -->
    <div class="progress-bar-wrap"></div>
    <!-- audio -->
    <audio src=""></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlayErrorPromptShow: false,
      playing: false,
      playModeText: "单曲循环",
    };
  },
  computed: {
    playIcon() {
      return this.playing ? "pause" : "play";
    },
    modeIcon() {
      return "sequence";
    },
  },
};
</script>

<style lang="scss" scoped>
.mini-player {
  // position: relative;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: $mini-player-height;
  background: var(--body-bgcolor);
  padding: 8px 16px 8px 24px;

  .song {
    flex: 4;
  }

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    @include flex-center();

    .icon {
      color: $theme-color;
    }

    .play-icon {
      background: $theme-color;
      width: 45px;
      height: 45px;
      margin: 0 16px;
      @include flex-center;
      border-radius: 50%;

      i {
        color: $white;
      }

      .icon-play {
        transform: translateX(1px);
      }
    }
  }

  .mode {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 6;

    .mode-item {
      display: block;
      margin-right: 16px;
      width: 22px;
    }

    .volume-item {
      margin-right: 22px;

      .block {
        width: 160px;
      }
    }
  }
}
</style>
