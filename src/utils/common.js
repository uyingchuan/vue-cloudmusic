// 获取给定尺寸的img
export function getImgUrl(url, width, height) {
    if (!height) {
        height = width
    }
    url += `?param=${width}y${height}`
    return url
}

// 填充，个位前加0
export function pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
        num = '0' + num
        len++
    }
    return num
}

// 格式化数字
export function formatNumber(number) {
    number = Number(number) || 0
    return number > 100000 ? `${Math.round(number / 10000)}万` : number
}
// 格式化时间
export function formatTime(interval) {
    // 取整，位或0运算是数字取整（舍去小数）速度最快的方法
    interval = interval | 0
    const minute = pad((interval / 60) | 0)
    const second = pad(interval % 60)
    return `${minute}:${second}`
}