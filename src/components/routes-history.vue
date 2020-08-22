<template>
    <div class="routes-history">
        <Icon type="back" class="leftIcon" backdrop @click="back" />
        <Icon type="forward" backdrop @click="next" />
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.back()
        },
        next() {
            this.$router.forward()
        }
    }
}
</script>

<style lang="scss" scoped>
.routes-history {
    display: flex;
    align-items: center;

    .leftIcon {
        margin-right: 16px;
    }
}
</style>
