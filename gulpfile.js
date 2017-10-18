'use strict';

var path = require('path'),
	fs = require('fs'),
	config = require('./lib/config'),
	gulp = require('gulp'),
	imageCompress;

var method = config.get('method'),
	srcPath = config.get('srcPath');

/**
 * 格式处理
 */
function imgPath(path) {
	console.log(path)
	var supportType = ['png', 'jpg', 'jpeg'],
		arr = [],
		path = path.slice(-1) === '/' ? path.slice(0, -1) : path;
	for (var i = 0; i < supportType; i++) {
		arr.push(path + '/**.*' + supportType[i]);
	}
	return arr;
}
/**
 * 如果method为tiny
 * imageCompress = {
 *   'image': require('gulp-image'),
 *   'tiny': require('gulp-tiny')
 * }[method];
 */
gulp.task('start', function() {
	var option;
	if (method === 'image') {
		imageCompress = require('gulp-image');
		option = 'gEGeOQwb_G6bM0KnFjevkhOWsj5dNusF';
	}
	if (method === 'tiny') {
		imageCompress = require('gulp-tinypng');
		option = {
			pngquant: true,
			optipng: false,
			zopflipng: true,
			jpegRecompress: false,
			mozjpeg: true,
			guetzli: false,
			gifsicle: true,
			svgo: true,
			concurrent: 10
		}
	}
	gulp.src(imgPath(srcPath))
	.pipe(imageCompress(option))
	.pipe(gulp.dest(`${srcPath}/dist-img/`));
});

gulp.task('default', ['start']);