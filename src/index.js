let str = require('./a');

console.log(str);

require('./index.css');
require('./index.less');

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
};

function * gen() {
  yield 1;
}
console.log(gen().next());
