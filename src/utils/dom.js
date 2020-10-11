// 对dom操作的工具集

// 是dom元素平滑滚动到视口区域（实验中的功能）
export function scrollInto(dom) {
    dom.scrollIntoView({ behavior: 'smooth' })
}

// 进入全屏模式
export function requestFullscreen(ele) {
    if (ele.requestFullscreen) {
        ele.requestFullscreen()
    } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen()
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen()
    } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen()
    }
}
// 退出全屏模式
export function exitFullscreen() {
    const pDoc = window.parent.document
    if (pDoc.exitFullscreen) {
        pDoc.exitFullscreen()
    } else if (pDoc.msExitFullscreen) {
        pDoc.msRequestFullscreen()
    } else if (pDoc.mozCancelFullScreen) {
        pDoc.mozRequestFullScreen()
    } else if (pDoc.webkitCancelFullScreen) {
        pDoc.webkitRequestFullScreen()
    }
}
// 判断是否全屏
export function isFullScreen() {
    return document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen
}

export function hasParent(dom, parentDom) {
    parentDom = Array.isArray(parentDom) ? parentDom : [parentDom]
    while(dom) {
        if (parentDom.find(o => o === dom)) {
            return true
        } else {
            dom = dom.parentNode
        }
    }
}