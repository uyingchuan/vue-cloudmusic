import { Input, Carousel, CarouselItem, Table, Popover, Pagination, TableColumn } from 'element-ui'
import * as utils from '@/utils'
import VueLazyload from 'vue-lazyload'
import Meta from 'vue-meta'

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

export default {
    install(Vue) {
        const requireComponent = require.context(
            "@/base", // 引入组件的根目录
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
        Vue.use(Pagination)
        Vue.use(TableColumn)

        Vue.use(Meta)

        Vue.use(VueLazyload, {
            loading: EMPTY_IMG,
            error: EMPTY_IMG,
        })
    }
}