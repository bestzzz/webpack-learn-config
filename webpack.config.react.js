// react动态链接库文件
// 使用 npx webpack --config webpack.config.react.js 来编译

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js', // 产生的文件名
    path: path.resolve(__dirname, 'build'),
    library: '_dll_[name]', // _dll_react
    // libraryTarget: 'var' // commonjs umd var this...
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'build', 'manifest.json')
    }) // 创建动态链接库
  ]
};
