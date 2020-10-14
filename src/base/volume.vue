<template>
  <div class="volume">
    <Icon :size="20" :type="getIconType()" @click="toggleSilence" class="icon" />
    <div class="progress-wrap">
      <ProgressBar :percent="volumePercent" @percentChange="onProgressChange" alwaysShowBtn />
    </div>
  </div>
</template>

<script>
export default {
    name: 'Volume',
    props: {
      volume: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        volumePercent: this.volume
      }
    },
    methods: {
      onProgressChange(percent) {
        if (percent < 0.05) {
          percent = 0
        }
        this.volumePercent = percent
        this.$emit('volumeChange', percent)
      },
      toggleSilence() {
        this.isSilence = !this.isSilence
      },
      getIconType() {
        return this.isSilence ? 'silence' : 'horn'
      }
    },
    computed: {
      isSilence: {
        get() {
          return this.volumePercent === 0
        },
        set(newSilence) {
          if (!this.lastVolume) {
            this.lastVolume = 1
          }
          const target = newSilence ? 0 : this.lastVolume
          if (newSilence) {
            this.lastVolume = this.volumePercent
          }
          this.volumePercent = target
          this.onProgressChange(target)
        }
      }
    }
};
</script>

<style lang="scss" scoped>
.volume {
  display: flex;
  align-items: center;
  width: 150px;

  .icon {
    color: var(--font-color);
    cursor: pointer;
    margin-right: 8px;
  }

  .progress-wrap {
    flex: 1;
  }
}
</style>
