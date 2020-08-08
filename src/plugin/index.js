import { Input, Carousel, CarouselItem, Table, Popover } from 'element-ui'
import * as utils from 'utils'

export default {
    install(Vue) {
        const requireComponent = require.context(
            "@/components/base", // 引入组件的根目录
            true, //是否需要查找下级目录
            /[a-z0-9]+\.(jsx?|vue)$/i
        )
        // 批量注册基础组件
        requireComponent.keys().forEach(fileName => {
            // 当前获取组件的配置数据
            const componentConfig = requireComponent(fileName)
            // 获取该组件的 default.name 属性
            const componentName = componentConfig.default.name
            if (componentName) {
                // 注册组件
                Vue.component(componentName, componentConfig.default || componentConfig)
            }
        })

        Vue.prototype.$ELEMENT = { size: "small" }
        Vue.prototype.$utils = utils
        
        Vue.use(Input)
        Vue.use(Carousel)
        Vue.use(CarouselItem)
        Vue.use(Table)
        Vue.use(Popover)
    }
}