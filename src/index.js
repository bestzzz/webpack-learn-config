const str1 = require('./a');

console.log(str1);

require('./index.css');
require('./index.less');
require('./image');
require('./request');

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
