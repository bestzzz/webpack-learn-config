import moment from 'moment';

// 忽略掉./locale文件后，需手动引入需要的语言文件
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const time = moment().endOf('day').fromNow();
console.log(time, 'time');
