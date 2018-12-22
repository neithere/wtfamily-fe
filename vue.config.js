module.exports = {
  configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      https: false,
      disableHostCheck: true
    },
    // uncomment to enable `template` instead of `render()` in entry point
    /*
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    }
    */
  }
}
