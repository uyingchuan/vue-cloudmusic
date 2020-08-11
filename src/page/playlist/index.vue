<template>
    <div class="playlist">
        <div class="top-play-list-card">
            <PlaylistTopCard />
        </div>
        <div class="tabs"></div>
        <div class="playlist-cards"></div>
    </div>
</template>

<script>
import PlaylistTopCard from "components/playlist-top-card"

export default {
    components: {
        PlaylistTopCard
    }
}
</script>

<style lang="scss" scoped>

</style>
