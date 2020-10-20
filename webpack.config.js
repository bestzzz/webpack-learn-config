// webpack 是node写出来的 需要采用node的写法

const path = require('path'); // 将路径转化为绝对路径
console.log(path.resolve(__dirname, 'dist'));

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devServer: {
    port: '8081',
    progress: true,
    contentBase: './build',
    compress: true
  }, // 开发服务器的配置
  mode: 'development', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后的文件名
    path: path.resolve('build'), // 路径必须是一个绝对路径
  }, // 出口
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
      filename: 'main.css',
    }),
  ], // 数组 放着所有的webpack插件
  module: {
    rules: [
      // loader的特点 功能单一
      // loader的用法 字符串只用于一个loader的情况 如果多个loader的话需要一个数组
      // loader的顺序 默认是从右向左执行 从下向上执行
      // loader还可以写成对象方式 (可以多传一些配置参数)

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
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              '@babel/plugin-transform-runtime'
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: '/node_modules/'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
        },
        enforce: "pre"
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
