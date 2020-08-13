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

export function getArtistsText(artists) {
    return (artists || []).map(({ name }) => name).join('/')
}