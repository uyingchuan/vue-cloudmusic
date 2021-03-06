const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    outputDir: 'music',
    configureWebpack: {
        devtool: isProd ? false : 'source-map',
        externals: isProd ? {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            axios: 'axios'
        } : {}
    },
    // 配置预加载sass的全局变量
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import '~@/style/variables.scss';
                    @import '~@/style/mixin.scss';
                `
            }
        }
    }
}