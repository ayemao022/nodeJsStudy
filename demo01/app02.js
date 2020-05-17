//表示引入http模块
const http = require('http');

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

	// 表示给页面上输出一句话
	// 如果写中文会乱码（因为当前为直接输出html页面，但在html页面的<htad>标签中没有设置utf-8）
	res.write('你好 is nodejs') 
	res.end() //结束响应
	
}).listen(8081); //监听端口（3000以上）

console.log('Server running at http://127.0.0.1:8081/');