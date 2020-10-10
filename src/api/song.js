import { request } from '@/utils'

// 获取音乐详情
export const getSongDetail = ids => request.get(`/song/detail?ids=${ids}`)

// 获取歌单详情（这里的接口有时间琢磨琢磨，好多相似的接口）
export const getListDetail = params => request.get('/playlist/detail', { params })

// 新歌速递
export const getTopSongs = type => request.get(`/top/song?type=${type}`)

// 歌词
export const getLyric = id => request.get(`/lyric?id=${id}`)