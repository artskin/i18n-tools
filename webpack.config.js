const path = require('path');
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require("copy-webpack-plugin");
const name="i18n-Tool"
module.exports = {
  entry:{
    "bundle":'./src/index.js',
    "main":'./main.js'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  devServer:{
    contentBase:path.join(__dirname,'dist'),
    compress:true,
    hot:true,
    port:9000
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
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public"},
      ],
    }),
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  target:'electron-renderer'
}