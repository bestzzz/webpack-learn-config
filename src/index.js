const str1 = require('./a');

console.log(str1);

require('./index.css');
require('./index.less');
require('./image');
// require('./request');
require('./moment');
require('./reactTest');

const fn = () => {
  console.log('es6');
};
fn();

@log
class F {
  a = 1;
}
const a = new F();
console.log(a.a, 'class');

function log (fn) {
  console.log(fn, '@');
}

function * gen() {
  yield 1;
}
console.log(gen().next());

// import $ from 'jquery';
console.log($); // 通过webpack.ProvidePlugin插件 将每个模块都注入了$。所以可以不import直接使用。

console.log(DEV, PRODUCTION, '环境变量');

// 使用import语法打包production环境文件时 webpack会自动删除没有用到的代码。而require就不会。
import calc from './calc';
console.log(calc.sum(1, 2));
