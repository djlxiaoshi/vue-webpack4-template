const baseConfig = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HappyPack = require('happypack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

const basePath = 'static/';

module.exports = WebpackMerge(baseConfig, {
  mode: 'production',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.less$/,//postcss-loader 依赖 postcss-config.js
        use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=less']
      },
      {
        test: /\.css$/,//postcss-loader 依赖 postcss-config.js
        use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=css']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({ //提取为外部css代码
      filename: `${basePath}css/[name]-[hash].css`
    }),
    new HappyPack({
      // 用唯 的标识符 id ，来代表当前的 HappyPack 是用来处理 类特定的
      id: 'css',
      threadPool: happyThreadPool,
      loaders: ['css-loader', 'postcss-loader', 'less-loader']
    }),
    new HappyPack({
      // 用唯 的标识符 id ，来代表当前的 HappyPack 是用来处理 类特定的
      id: 'less',
      threadPool: happyThreadPool,
      loaders: ['css-loader', 'postcss-loader', 'less-loader']
    }),
    new WorkboxPlugin.GenerateSW({
      cacheId: 'webpack-pwa', // 设置前缀
      skipWaiting: true, // 强制等待中的 Service Worker 被激活
      clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
      // swDest: 'service-worker.js', // 输出 Service worker 文件
      // globDirectory: './',
      importWorkboxFrom: 'local', // 设置从本地加载workbox而不是cdn（这个cdn需要梯子）
      runtimeCaching: [
        {
          // iconfont
          urlPattern: new RegExp('^http://at.alicdn.com'),
          handler: 'staleWhileRevalidate',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          // 其他静态资源
          urlPattern: new RegExp('/static/'),
          handler: 'CacheFirst'
        }
      ]
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      // 在webpack4中css,js压缩需要自己安装插件
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
