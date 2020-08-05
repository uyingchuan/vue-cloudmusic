module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/cloudmusic' : '/',
    configureWebpack: {
        resolve: {
            alias: {
                'components': '@/components'
            }
        }
    }
}