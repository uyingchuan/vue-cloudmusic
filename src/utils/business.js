// 业务相关工具集

import router from "@/router"
import { getMvDetail, getAlbum } from "@/api"
import { isDef, notify } from "./common"

// 整理song对象
export function createSong(song) {
    const {
        id,
        name,
        img,
        artists,
        duration,
        albumId,
        albumName,
        mvId,
        ...rest
    } = song
    return {
        id,
        name,
        img,
        artists,
        duration,
        albumName,
        url: getSongPlayUrl(song.id),
        artistsText: getArtistsText(artists),
        durationSecond: duration / 1000,
        // 专辑 如果需要额外请求封面，就需要加上
        albumId,
        // mvId，如果有，会在songTable组件上加上mv链接
        mvId,
        ...rest
    }
}

function getSongPlayUrl(id) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export async function getSongImg(id, albumId) {
    if (!isDef(albumId)) {
        throw new Error('need albumId')
    }
    const { songs } = await getAlbum(albumId)
    const {
        al: { picUrl }
    } = songs.find(({ id: songId }) => songId === id) || {}
    return picUrl
}

export function getArtistsText(artists) {
    return (artists || []).map(({ name }) => name).join('/')
}

export async function goMvWithCheck(id) {
    try {
        await getMvDetail(id)
        goMv(id)
    } catch (error) {
        notify("mv获取失败")
    }
}

export function goMv(id) {
    router.push(`/mv/${id}`)
}