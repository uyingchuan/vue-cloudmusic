<script>
import { toRem } from "@/utils";

export default {
  name: "Icon",
  props: {
    size: {
      type: Number,
      default: 16,
    },
    type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
    backdrop: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getIconCls() {
      let cls = `icon-${this.type}`;
      if (this.color) {
        cls += ` icon-color-${this.color}`;
      }
      return cls;
    },
    onclick(e) {
      this.$emit("click", e);
    },
    getIconStyle() {
      const chromeMinSize = 12;
      // ret: 返回 ratio: 比例
      // 通过css3 transform 支持小于 12px
      const retStyle = { fontSize: toRem(this.size) };
      if (this.size < chromeMinSize) {
        const ratio = this.size / chromeMinSize;
        retStyle.transform = `scale(${ratio})`;
      }
      return retStyle;
    },
  },
  render() {
    const Icon = (
      <i
        onclick={this.onclick}
        class={`iconfont icon-component ${this.getIconCls()}`}
        style={this.getIconStyle()}
      />
    );
    if (this.backdrop) {
      const backdropSizeRatio = 1.56;
      const backdropSize = toRem(backdropSizeRatio * this.size);
      return (
        <span
          style={{ width: backdropSize, height: backdropSize }}
          class="backdrop"
        >
          {Icon}
        </span>
      );
    }
    return Icon;
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  display: inline-block;
  @include flex-center;
  border-radius: 50%;

  &:hover {
    background: var(--round-hover-bgcolor);
  }
}

.icon-component {
  cursor: pointer;
}

.icon-color {
  // 通过父组件传入prop值控制样式
  &-theme {
    // color: $theme-color;
    color: #f00000;
  }
  &-white {
    // color: $white;
    color: #fff;
  }
  &-shallow {
    color: var(--font-color-shallow-grey);
  }
}
</style>
