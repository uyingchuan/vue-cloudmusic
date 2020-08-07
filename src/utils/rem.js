import { throttle } from 'lodash-es'

export const remBase = 14

// 配合postcss-pxtorem插件使用，
// 使页面尺寸单位从px转为rem
// 并且能在移动端适配
let htmlFontSize
!(function() {
    const calc = function() {
        const maxFontsize = 18
        const minFontSize = 14
        const html = document.getElementsByTagName('html')[0]
        // html页面窗口视图宽度
        const width = html.clientWidth
        // 使字体大小始终在14~18之间变动，根据视口宽度与1440px的比例
        let size = remBase * (width / 1440)
        size = Math.min(maxFontsize, size)
        size = Math.max(minFontSize, size)
        html.style.fontSize = size + 'px'
        // 赋值给全局变量 htmlFontSize
        htmlFontSize = size
    }
    calc()
    window.addEventListener('resize', throttle(calc, 500))
})()

// 根据基准字号计算，用于静态样式
export function toRem(px) {
    return `${px / remBase}rem`
}

// 根据当前html根字体尺寸计算，用于动态样式
export function toCurrentRem(px) {
    return `${px / htmlFontSize}rem`
}