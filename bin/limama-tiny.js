#!/usr/bin/env node

'use strict';

var path = require('path'),
	fs = require('fs'),
	cliColor = require('cli-color'),
	minimist = require('minimist'),
	config = require('../lib/config'),
	argv = minimist( process.argv.slice(2) );


// 提示错误并退出
function errorExit(msg) {
	console.error( cliColor.red(msg) );
	process.exit(1);
}

var method = argv.method ? String(argv.method).toLowerCase() : 'image';
// 检查method参数合法性
if (['tiny', 'image'].indexOf(method) === -1) {
	errorExit('unexpected ' + method + ' method  argument');
}

// 获取项目路径后把参数移除，否则Gulp会把它当做任务id
var srcPath = process.argv[2];
process.argv.splice(2, 1);
// 检查源代码目录是否存在
if (srcPath) {
	srcPath = path.resolve(srcPath);
	if ( !fs.existsSync(srcPath) ) {
		errorExit('"' + srcPath + '" does not exist');
	}
} else {
	errorExit('Please specify source path');
}
config.set('srcPath', srcPath);

// 调用gulp入口文件后就会调用gulpfile.js，这样无法把各种配置通过参数传过去
// 解决方法：把用到的参数存在config中，在gulpfile.js中调用它就可以获取
config.set('method', method);

// 通过参数指定调用本工具的gulpfile.js文件，而非工作目录下的
process.argv.push( '--gulpfile', path.join(__dirname, '../', 'gulpfile.js') );

// 调用gulp命令的入口文件开始构建
require('gulp/bin/gulp');
