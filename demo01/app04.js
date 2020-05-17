// node-http-server 自动生成基础代码块

//表示引入http模块
const http = require('http');
const url = require('url');

/**
 * request		获取客户端（浏览器）传过来的信息（url）
 * response		给浏览器响应信息
 */
http.createServer((req, res) => {

	console.log(req.url); //获取url
	
	// 设置响应头
	// 状态码是 200，文件类型是 html，字符集是 utf-8
	res.writeHead(200, {
		"Content-type": "text/html;charset='utf-8'"
	})

	// 加上这一句就不会报错了
	//页面编码规范要和响应头设置相同，就不会乱码
	res.write('<head><meta charset="UTF-8"></head>')

	// 代码
	// 点开页面才会有响应
	// 获取浏览器的地址信息
	console.log(req.url);
	// 默认会请求一条（获取该网页的小图标）
	if (req.url !== '/favicon.ico') {
		let userInfo = url.parse(req.url, true).query
		console.log(`姓名：${userInfo.name}---年龄：${userInfo.age}`);
	}

	res.end('你好，nodejs') //结束响应
	
}).listen(8081); //监听端口（3000以上）

console.log('Server running at http://127.0.0.1:8081/');