module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/cloudmusic' : '/',
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