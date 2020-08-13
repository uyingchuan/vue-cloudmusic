import { request } from '@/utils'

// 获取歌单详情
export const getSongDetail = ids => request.get(`/song/detail?ids=${ids}`)

// 获取歌单详情
export const getListDetail = params => request.get('/playlist/detail', { params })