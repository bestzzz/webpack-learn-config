// webpack打包图片
// 1.在js中创建图片引入
// file-loader默认会在内部生成一张图片 到build目录下
// 把生成图片的名字返回回来
import logo from './logo.png'; // 把图片引入，返回的结果是一个图片地址
const image = new Image();
console.log(logo);
image.src = logo;
document.body.appendChild(image);

// 2.在css中引入 background: url();  这种方式导入图片是不需要额外loader的，因为css-loader就会处理
// 3.<img src="" alt=""/>
