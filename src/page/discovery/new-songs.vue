<template>
  <div v-if="list.length" class="new-songs">
    <Title>最新音乐</Title>
    <div class="list-wrap">
      <div
        class="list"
        :key="listIndex"
        v-for="(list, listIndex) in thunkedList"
      >
        <songCard
          :key="item.id"
          :order="getSongOrder(listIndex, index)"
          class="song-card"
          v-bind="normalizeSong(item)"
          v-for="(item, index) in list"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { createSong } from "utils";
import { getNewSongs } from "@/api";
import SongCard from "components/song-card"

const songsLimit = 10
export default {
  async created() {
    const { result } = await getNewSongs();
    this.list = result;
  },
  data() {
    return {
      list: [],
      chunkLimit: Math.ceil(songsLimit / 2),
    };
  },
  methods: {
    getSongOrder(listIndex, index) {
      return listIndex * this.chunkLimit + index + 1
    },
    normalizeSong(song) {
      const {
        id,
        name,
        song: {
          mvid,
          artists,
          album: { blurPicUrl },
          duration
        }
      } = song
      return createSong({
        id,
        name,
        img: blurPicUrl,
        artists,
        duration,
        mvId: mvid
      })
    },
  },
  computed: {
    thunkedList() {
      return [
        this.list.slice(0, this.chunkLimit),
        this.list.slice(this.chunkLimit, this.list.length),
      ];
    },
  },
  components: {
    SongCard
  }
};
</script>

<style lang="scss" scoped>
.new-songs {
  margin-bottom: 36px;
  
  .list-wrap {
    display: flex;

    .list {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
