<template>
    <div class="button" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'common'
        }
    },
    name: 'Button',
    methods: {
        onClick(e) {
            this.$emit('click', e)
        }
    }
}
</script>

<style lang="scss" scoped>
.button {
    display: inline-block;
    padding: 5px 16px;
    border: 1px solid var(--button-border-color);
    border-radius: 2px;
    text-align: center;
    cursor: pointer;

    &:hover {
        background: var(--button-hover-bgcolor);
    }
}
</style>