## webpack安装
- 安装本地的webpack
- webpack webpack-cli -D

## webpack可以进行0配置
- 打包工具 -> 输出后的结果 (js模块)
- 打包 (支持js的模块化)

## 手动配置webpack
- 默认配置文件的名字 webpack.config.js




# webpack的优化
### module.noParse属性
- 这个属性可以忽略一个外部引用包的解析。假如一个外部引用包没有引用其他包的话(比如jquery)，可以使用这个属性去忽略这个包的解析。从而提高打包效率，节省打包时间。

### loader中的include/exclude属性
- 这两个属性可以避免loader去解析没有必要解析的文件。比如我们仅仅解析src目录下的文件就行了，但是如果没有设置这两个属性，webpack默认会去解析所有目录下的文件(比如node_modules)，这样就会造成时间和性能上的浪费。这时我们将exclude: '/node_modules/'，include: 'src'就可以了。

### webpack.IgnorePlugin
