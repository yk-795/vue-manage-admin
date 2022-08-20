const { defineConfig } = require('@vue/cli-service')
// Element-plus自动按需导入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true
})
// Element-plus自动按需导入
module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {

      fallback: { path: require.resolve('path-browserify') }

    }
  },
  /*
    webpack devServer 提供了代理的功能，该代理可以把所有请求到当前服务中的请求，
    转发（代理）到另外的一个服务器上
  */
  devServer: {
    proxy: {
      // 当地址中包含 /api 的时候，触发此代理
      '/api': {
        target: 'ttp://localhost:4000',
        // 是否跨域
        changOrigin: true
      }
    }
  },
  // 处理svg图标
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
