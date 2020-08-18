// 对dom操作的工具集

// 是dom元素平滑滚动到视口区域（实验中的功能）
export function scrollInto(dom) {
    dom.scrollIntoView({ behavior: 'smooth' })
}