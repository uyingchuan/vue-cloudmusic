import { request } from '@/utils'

// 获取歌单
export const getPlaylists = (params) => request.get('/top/playlist', { params })
// 获取精品歌单
export const getTopPlaylists = (params) => request.get('/top/playlist/highquality', { params })