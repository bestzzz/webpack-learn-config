// webpack 是node写出来的 需要采用node的写法

const path = require('path'); // 将路径转化为绝对路径
console.log(path.resolve(__dirname, 'dist'));

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css打包到一个文件中通过link标签引入, 不然样式是以style标签的形式直接添加到html中的
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次build时候 清空上次build的文件
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝插件 将某目录直接拷贝到打包目录下 例如将doc拷贝到build下
const webpack = require('webpack');

const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css的插件
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin'); // js优化工具，通常和上面的压缩css插件一起使用

module.exports = {
  devServer: {
    port: '8080',
    progress: true,
    contentBase: './build',
    compress: true
  }, // 开发服务器的配置
  mode: 'development', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后的文件名
    path: path.resolve('build'), // 目录 路径必须是一个绝对路径
    // publicPath: 'http://mmears.com/static/', // 统一给静态资源加上域名(cdn服务器)，也可以单独在对应文件的loader中的options参数里加
  }, // 出口

  resolve: {
    modules: path.resolve('node_modules'), // 模块查找路径
    extensions: ['.js', '.css', '.json', '.jsx'], // 扩展名, 用于import引用时省略文件后缀
  },

  // 解决服务问题的配置
  // devServer: {
    // 1. 钩子函数，可以用来mock请求数据
    // before(server) {
    //   server.get('/api/user', (req, res) => {
    //     res.json({name: '这是一条由before钩子生成的mock数据'});
    //   })
    // },
    // 2. 配置一个代理，将/api开头的请求代理到端口号为8000的服务上。可以解决开发环境中的跨域问题。
    // proxy: {
    //   '/api': 'http://localhost:8000'
    // }
  // },

  // 增加映射文件 可以帮助我们调试源代码
  // 1.source-map 源码映射 会生成一个sourcemap文件 报错时会标注出报错的行列 便于调试
  devtool: 'source-map',
  // 2.eval-source-map 不会产生单独的文件 但是可以显示行和列
  // devtool: 'eval-source-map',
  // 3.不会产生行和列 但是是一个单独的映射文件 不方便调试 但是可以保留一份源文件
  // devtool: 'cheap-module-source-map',
  // 4.不会产生文件 集成在打包后的文件中 不会标注行和列
  // devtool: 'cheap-module-eval-source-map',

  // 监控 代码一变就实时build
  // watch: true,
  // watchOptions: {
  //   poll: 1000, // 每秒 问我 1000次
  //   aggregateTimeout: 500, // 防抖
  //   ignored: /node_modules/, // 不需要进行监控的文件
  // }, // 监控的配置参数

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模版相对路径
      filename: 'index.html', // 生成的文件名
      minify: {
        removeAttributeQuotes: true, // 去除双引号
        collapseWhitespace: true, // 折叠成一行
      }, // 压缩
      hash: true // 脚本文件增加hash值
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css', // 将css样式打包到css目录下的main文件中
    }),
    new webpack.ProvidePlugin({ // 在每个模块中都注入$
      $: 'jquery'
    }),
    new CleanWebpackPlugin('./build'),
    new CopyWebpackPlugin(
      [
        {
          from: './doc',
          to: './'
        }
      ]
    ),
    new webpack.BannerPlugin('make 2020.10 by zz'), // 将版权声明插入到js文件中
  ], // 数组 放着所有的webpack插件
  module: {
    rules: [
      // loader的特点 功能单一
      // loader的用法 字符串只用于一个loader的情况 如果多个loader的话需要一个数组
      // loader的顺序 默认是从右向左执行 从下向上执行
      // loader还可以写成对象方式 (可以多传一些配置参数)

      {
        test: /\.html$/,
        use: 'html-withimg-loader' // 在html中引入图片 需要此loader做处理
      },
      {
        test: /\.(png|jpg|gif)$/,
        // 做一个限制 当我们的图片小于多少k的时候 用base64转化，否则用file-loader产生真实的图片
        // use: 'file-loader'
        use: {
          loader: 'url-loader',
          options: {
            limit: 1, // 限制200k
            esModule: false,
            outputPath: '/img/', // 将图片资源放到img目录下
            // publicPath: 'http://mmears.com/static/', // 统一给静态资源加上域名(cdn服务器)
          }
        }
      },
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$'
      // }, // 将jquery暴露到window中

      // css-loader 解析 @import这种语法的
      // style-loader 它是把css 插入到head的标签中
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: 'style-loader',
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          // },
          MiniCssExtractPlugin.loader,
          'css-loader', // @import 解析路径
          'postcss-loader', // 为样式加上兼容前缀
          'less-loader' // less -> css 把less解析成css
        ]
      },
      {
        test: /\.js$/,
        use: { // 用babel-loader es6 -> es5
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              // '@babel/plugin-proposal-class-properties'
              ["@babel/plugin-proposal-decorators", { "legacy": true }], // 将es6的修饰器转为es5
              ["@babel/plugin-proposal-class-properties", { "loose" : true }], // 将es6的class类转为es5
              '@babel/plugin-transform-runtime' // 和上面的class-properties一起使用，装有class-properties的补丁包，一起打包上线
            ]
          }
        },
        include: path.resolve(__dirname, 'src'), // 只包含当前目录下的src目录下的js文件，其余文件不予打包
        exclude: '/node_modules/' // 不包括node_modules目录下的js文件
      },
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
        },
        enforce: "pre" // 优先级高 pre在其他loader之前
      }
    ] // 规则 
  }, // 模块
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new UglifyjsWebpackPlugin({
        cache: true, // 缓存
        parallel: true, // 并发打包
        sourceMap: true // 源码映射
      }),
    ]
  }, // 优化项
};
