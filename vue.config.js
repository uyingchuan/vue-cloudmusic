module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/cloudmusic' : '/',
    configureWebpack: {
        resolve: {
            alias: {
                'components': '@/components',
                'style': '@/style',
                'utils': '@/utils'
            }
        }
    },
    // 配置css的全局变量
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import '~style/variables.scss';
                    @import '~style/mixin.scss';
                `
            }
        }
    }
}