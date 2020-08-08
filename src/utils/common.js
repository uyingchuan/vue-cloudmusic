export function getImgUrl(url, width, height) {
    if (!height) {
        height = width
    }
    url += `?param=${width}y${height}`
    return url
}

export function pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
        num = '0' + num
        len++
    }
    return num
}