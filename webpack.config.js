const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  entry:{
    "bundle":'./src/index.js',
    "main":'./main.js'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  
  module:{
    rules:[
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',//https://github.com/vuejs/vue-style-loader/issues/42
          'css-loader',
          'less-loader'
        ]
      },
      // {
      //   test:/\.vue$/,
      //   use: {
      //     loader: 'vue-loader',
      //     options: {
      //       extractCSS: true,
      //       loaders: {
      //         less: 'vue-style-loader!css-loader!less-loader'
      //       }
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  target:'electron-renderer'
}