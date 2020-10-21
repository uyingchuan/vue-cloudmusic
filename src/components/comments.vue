<template>
  <div class="comments">
    <!-- 精彩评论 -->
    <template>
      <div v-if="isHotCommentShow">
        <p>精彩评论</p>
        <Comment
          v-for="(comment, index) in hotComments"
          :key="index"
          :comment="comment"
          :border="!$utils.isLast(index, comments)"
        />
      </div>
    </template>
    <!-- 最新评论 -->
    <template>
      <div v-if="isNewCommentShow">
        <p ref="commentTitle">最新评论</p>
      </div>
      <Comment
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
        :border="!$utils.isLast(index, comments)"
      />
    </template>

    <Pagination
      :current-page.sync="currentPage"
      :page-size="PAGE_SIZE"
      :total="total"
      @current-change="onPageChange"
      class="pagination"
    />
  </div>
</template>

<script>
import Comment from './comment'
import { getSongComment, getPlaylistComment, getMvComment, getHotComment } from '@/api'
import { getPageOffset, scrollInto } from '@/utils'

const SONG_TYPE = 'song'
const PLAYLIST_TYPE = 'playlist'
const MV_TYPE = 'mv'

const PAGE_SIZE = 20
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: SONG_TYPE
    }
  },
  created() {
    this.PAGE_SIZE = PAGE_SIZE
  },
  data() {
    return {
      currentPage: 1,
      hotComments: [],
      comments: [],
      total: 0
    }
  },
  methods: {
    async getComment() {
      const commentRequestMap = {
          [PLAYLIST_TYPE]: getPlaylistComment,
          [SONG_TYPE]: getSongComment,
          [MV_TYPE]: getMvComment
      }
      const commentRequest = commentRequestMap[this.type]
      const { hotComments = [], comments = [], total } = await commentRequest({
          id: this.id,
          pageSize: PAGE_SIZE,
          offset: getPageOffset(this.currentPage, PAGE_SIZE)
      })

      // 歌曲的热评需要单独的请求接口获取
      if (this.type === PLAYLIST_TYPE && this.currentPage === 1) {
        const { hotComments: exactHotComments = [] } = await getHotComment({
          id: this.id,
          type: 2
        })
        this.hotComments = exactHotComments
      } else {
        this.hotComments = hotComments
      }

      this.comments = comments
      this.total = total
      this.$emit("update", { comments, hotComments, total })
    },
    async onPageChange() {
      await this.getComment()
      this.$nextTick(() => {
        scrollInto(this.$refs.commentTitle)
      })
    }
  },
  watch: {
    id: {
      handler(newId) {
        if (newId) {
          this.currentPage = 1
          this.getComment()
        }
      },
      immediate: true
    }
  },
  computed: {
    isHotCommentShow() {
      return this.hotComments.length > 0 && this.currentPage === 1
    },
    isNewCommentShow() {
      return this.comments.length > 0
    }
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss" scoped></style>
