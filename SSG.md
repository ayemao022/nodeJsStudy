## nodejs学习

#### 01-终端（shell，DOS窗口）
- 路径：当前所在目录
- 常用指令：
	- dir		打开当前目录下的所有文件（夹）
	- cd 目录名		可进指定目录（按Tab可自动补全）
	- md 目录名		创建文件夹
	- rd 目录名		删除文件夹
	- 盘符名:		直接进入指定盘，如c:

- 目录
	- .	表示当前目录
	- .. 表示上一级目录

- 环境变量（系统变量）
	- path
		- 当在命令行窗口打开一个文件，或者调用一个程序时，系统会在当前目录下寻找文件程序，找到直接打开或启动，没找到则会依次到环境变量path中寻找，如果都找到，则报错
		- 所以可以将经常访问的文件和程序的路径添加到path中，这样就可以在任意位置访问文件程序了

#### 02-进程和线程
- 进程
	- 进程负责为程序的运行提供必备的环境（工厂车间）

- 线程
	- 线程是计算机中的最小的计算单位，线程负责执行进程中的程序（车间工人）

- 单线程
	- JS是单线程的，为了避免渲染时冲突（css，js修改DOM或样式）

- 多线程

- node的服务器是单线程的
	- Node处理请求时是单线程的，但是在后台拥有一个 I/O 线程池

#### 03-nodejs
- 模块化： 引用、定义、标识
	- 定义：一个js文件就是一个模块
	- 引用：在node中，通过 require(url) 函数引入外部模块，路径必须使用相对路径（. / .. 开头）
		- node自带的核心模块，可以不写路径，如 require('fs')
	- 标识：使用 require() 引入模块后，该函数会返回一个对象，代表引入的模块，在node中，每一个js文件中的js代码，都是独立的，而不是全局的，通过exports向外部暴露变量和方法
		- exports.a = 10
	- 当node执行模块化代码时，会包装成一个函数，有exports、require、module、__filename、__dirname参数
		- module 代表的是当前模块本身
		- __filename 当前模块的完整路径
		- __dirname 当前模块所在文件夹的路径

- global：
	- node中的全局对象，类似网页中的window对象，模块中定义的属性都不是全局的

- 包 package（模块的集合，增强的模块）
	- 相关的模块整合到一起，形成完整的工具，包含包结构和包描述文件
	- 结构：
		- package.json  描述文件（必须）
		- bin  可执行二进制文件
		- lib  js代码
		- doc  文档
		- test  单元测试
	- 描述文件：描述包的相关信息，以供外部读取分析

- NPM（Node Package Manager，包管理工具）
	- npm search 包名：搜索模块包
	- npm install 包名：在当前目录安装包（必须有package.json才能装在本地）
	- npm i 包名 --save：安装并添加到依赖中
	- npm i -g 包名：全局安装包
	- npm i：自动安装当前项目的依赖
	- npm remove 包名：删除一个模块
	- npm i 文件路径：从本地安装
	- npm i 包名 -registry=地址：从镜像源安装
	- npm config set registry=淘宝镜像地址：设置镜像源地址
		- npm i -g cnpm --registry=https://registry.npm.taobao.org：可不设置镜像源而直接使用cnpm安装
		- 使用原版的源就用npm，使用淘宝的镜像源就cnpm
		- cnpm下载的包和npm下载的包结构不一样，但用法一样
	
- 使用require('模块名')引入模块时，会现在当前项目的node_modules中寻找是否含有该模块，没有会一直向上（外层）寻找模块（类似作用域）

#### 04-Buffer（缓冲区）
- Buffer的结构和数组很像，操作方法也和数组类似
- 数组中不能存储二进制文件，Buffer就可以
- 使用Buffer不需要引入模块，可直接使用，node中的核心对象
- Buffer中存储的都是二进制数据，但以16进制的形式展示
- buffer中的每一个元素范围是从 00 - ff  0 - 255  00000000 - 11111111， 一个元素占1个字节
- buf.length：该buf占用的内存大小（1个英文1个字节，1个汉字3个字节）
- buffer的构造函数不推荐使用，可使用Buffer.alloc(10)，创建一个10字节长度的Buffer
- buffer的大小一旦确定，则不能修改，Buffer实际上是对底层内存的直接操作
- Buffer.allocUnsafe(size)，创建一个指定大小的呃buffer，但可能含有敏感数据
- Buffer.from(str)，将一个字符串转换为buffer
- buf.toString()，将缓冲区中的数据转换为字符串

#### 05-fs（File System，文件系统）
- 通过node来操作系统中的文件
- 核心模块，需要引入
- 同步方法
	- fs.xxxSync
	- 会阻塞程序执行

	- 打开文件：fs.openSync(path, flags[, mode])
		- path：要打开的文件路径
		- flags：打开文件要做的操作
			- r：只读
			- w：可写的
		- 返回值：
			- 该方法会返回一个文件的描述符作为结果，我们可以通过该描述符对文件进行操作（数字）

	- 写入内容：fs.writeSync(fd, string[, position[, encoding]])
		- fd：文件的描述符，同上
		- string：要写入的内容
		- position：表示写入的起始位置
		- encoding：写入的编，默认UTF-8
	
	- 保存并关闭：fs.closeSync(fd)
		- fd：需要关闭的文件的描述符

- 异步方法（常用，效率高，出错也不阻塞）
	- fs.xxx
	- 不会阻塞，通过回调函数将结果返回，所以参数都包含callback

	- 打开文件：fs.open()
		- 参数同上，最后多一个callback
		- 异步调用的方法，结果是通过回调函数的参数返回的
		- 需要确认回调函数有几个参数（2个）
			- err：错误对象，如果没有错误则为null
			- fd：文件描述符
	
	- 写入内容：fs.write()
		- 需要放在打开的open()函数的 callback 中执行（才有fd）
	  -	回调函数中有三个参数
			- err：错误对象（node的错误优先原则）
			- writeten：指定传入的字符串被写入多少字节（并不等同于字符串的字节大小）
			- string

	- 关闭：fs.close()
		- 回调函数只有一个err参数

- 简单文件写入
	- fs.writeFile(file, data[, options], callback)
	- fs.writeFileSync(file, data[, options])
		- file：要操作的文件的路径
		- data：要写入的数据
		- options：选项，可以对写入进行一些设置
		- callback：当写入完成以后执行的操作
		- 不需要打开文件和关闭文件，底层已经写过了
		- options是个配置数据，对象形式，有个默认flag为‘w’，会将原文件覆盖重写
		- a：打开文件，并在尾部追加
		- 注意 \ 转义字符

- 流式文件写入
	- 同步、异步，简单文件写入都不适合大文件写入，性能差，消耗高，容易内存溢出
	- 创建一个可写流 fs.createWriteStream(path,  [, options])
		- path：路径
		- options：配置参数
	- 该方法返回一个对象，即可写流对象 ws
		- 写入：ws.write()
			- 只要ws存在，即可一直调用write()方法，一直写入
		- 结束：ws.end()
			- 不能用close，用end表示结束
	- 可以监听流的 open 和 close 事件，来监听流的打开和关闭
		- ws.once('open', func(){})
		- ws.once('close', func(){})

- 同步文件读取，异步文件读取，简单文件读取、流式文件读取
	- fs.readSync() sync表示同步
	- fs.read()
	- fs.readFile(path[, options], callback)
		- path：文件地址
		- options：配置对象
		- callback：回调函数，(err, data) => {}
		- 读到的数据是buffer数据，而不是文字，需要toString()一下，因为不一定是读文字，还可能是图片视频等
	- fs.createReadStream()
		- 创建一个可读流，rs
		- 监听流的开启和关闭
			- rs.once('open', () => {})
			- rs.once('close', () => {})
		- 如果要读取一个可读流的数据，必须要给rs绑定一个data事件
			- rs.on('data', (data) => {}) data参数即读取到的数据
			- 读取完，流会自动关闭
		- 用可读流、可写流传递数据比较麻烦
			- 可使用 rs.pipe(ws)
			- 即可直接将可读流中的数据写到可写流中

#### 06-fs模块的其他方法
- fs.existsSync(path)：验证路径是否存在，返回 boolean，没必要异步
- fs.stat(path, (err, stat) => {})：获取文件信息，stat 信息对象
	- stat.isFile()：是否是一个文件
	- stat.isDirecyory()：是否是文件夹、目录
- fs.unlink(path)：删除文件
- fs.readdir(path[, options], (err, files) => {})：查看目录结构
	- files：是一个字符串数组
- fs.truncate(path, len, callback)：截断文件，将文件修改为 len 的指定大小
- fs.mkdir(path[, mode], callback)：创建文件夹、目录
- fs.rmdir(path, callback)：删除目录
- fs.rename(OldPath, newPath, callback)：重命名一个文件或者文件夹, 或者改变路径（剪切）
- fs.wathcFile(filename[, options], listener)：监视文件的修改
	- filename：文件名
	- options：配置对象
		- 有一定的反应时间，因为他是定时轮询比较文件修改前和修改后的状态的
		- interval：自己设定轮询时间
	- listener：回调函数，当文件发生变化时触发回调
		- 两个参数，curr当前文件状态，prev之前的文件状态，都是stats对象