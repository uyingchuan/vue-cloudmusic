import { shallowEqual } from "@/utils";
export default {
  setCurrentSong(state, song) {
    state.currentSong = song;
  },
  setPlayingState(state, playing) {
    state.playing = playing;
  },
  setPlaylist(state, playlist) {
    const { isPlaylistShow, playlist: oldPlaylist } = state;
    state.playlist = playlist;
    // 播放列表未显示 并且两次播放列表的不一样 则弹出提示
    if (!isPlaylistShow && !shallowEqual(oldPlaylist, playlist, "id")) {
      state.isPlaylistPromptShow = true;
      setTimeout(() => {
        state.isPlaylistPromptShow = false;
      }, 2000);
    }
  },
  setPlayHistory(state, history) {
    state.playHistory = history;
  },
  setPlayerShow(state, show) {
    state.isPlayerShow = show
  },
  setPlaylistShow(state, show) {
    state.isPlaylistShow = show
  },
  setPlaylistPromptShow(state, show) {
    state.isPlaylistPromptShow = show
  },
  setPlayMode(state, mode) {
    state.playMode = mode
  },
  setCurrentTime(state, time) {
    state.currentTime = time
  },

  setMenuShow(state, show) {
    state.isMenuShow = show
  }
};
