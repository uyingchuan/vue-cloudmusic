export function getImgUrl(url, width, height) {
    if (!height) {
        height = width
    }
    url += `?param=${width}y${height}`
    return url
}