const url = require('url');

let api = 'htpp://www.itying.com?name=zhangsan&age=20'

// 并非在浏览器的控制台输出，而是在服务器的终端输出日志
// 如果在 api 后面，添加 true 参数，可以吧当前的 url 地址的参数（query）转化成对象
console.log(url.parse(api, true));

// 获取参数
let getQuery = url.parse(api, true).query

console.log(getQuery)
console.log(`姓名：${getQuery.name}---年龄：${getQuery.age}`);
