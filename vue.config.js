const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    outputDir: 'music',
    configureWebpack: {
        devtool: isProd ? false : 'source-map'
    },
    // 配置css加载额外的sass的全局变量
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