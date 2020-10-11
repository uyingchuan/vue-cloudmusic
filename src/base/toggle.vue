<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { hasParent } from "@/utils"

export default {
    name: "Toggle",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        reserveDoms: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        clickEvent(e) {
            const triggerElement = e.target
            const firstElement = this.$slots.default[0].elm
            const defaultReserveDoms = Array.from(
                document.querySelectorAll('el-loading-mask', 'el-loading-spinner')
            )
            const reserves = defaultReserveDoms.concat(firstElement)
            if (!hasParent(
                triggerElement,
                reserves.concat(this.reserveDoms)
            )) {
                this.$emit('update:show', false)
            }
        },
        bindClick() {
            document.addEventListener('mousedown', this.clickEvent)
        },
        removeClick() {
            document.addEventListener('mousedown', this.clickEvent)
        }
    },
    watch: {
        show(newShow) {
            if (newShow) {
                this.bindClick()
            } else {
                this.removeClick()
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
