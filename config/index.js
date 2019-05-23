// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../criussell&www/index.html'),
    assetsRoot: path.resolve(__dirname, '../criussell&www'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    assetsPublicPath: '/criussell&www/',// criussell&www/
    assetsPublicPatImg:'',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9000,
    autoOpenBrowser: false,
    assetsSubDirectory: '/static/',
    assetsPublicPath: '',
    assetsPublicPatImg:'/static/',
    proxyTable: {},
    context:[
      '/crius_buyer',
      '/api',
      "/criussell",
      '/crius_admin',
      'static',
      './static'
    ],
    contextHost:{
      localHost:'http://49.4.12.144:8080',
      serHost:'http://49.4.12.144:8080'
    },

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
