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
	var supportType = ['png'],
		arr = [],
		path = path.slice(-1) === '/' ? path.slice(0, -1) : path;
	for (var i = 0; i < supportType.length; i++) {
		arr.push(path + '/**.' + supportType[i]);
	}
	console.log(JSON.stringify(arr));
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
		imageCompress = require('gulp-imagemin');
		// option = [
		// 	imageCompress.gifsicle({interlaced: true}),
		// 	imageCompress.jpegtran({progressive: true}),
		// 	imageCompress.optipng({optimizationLevel: 5}),
		// 	imageCompress.svgo({
		// 		plugins: [
		// 			{removeViewBox: true},
		// 			{cleanupIDs: false}
		// 		]
		// 	})
		// ]
	}
	if (method === 'tiny') {
		imageCompress = require('gulp-tinypng');
		option = 'gEGeOQwb_G6bM0KnFjevkhOWsj5dNusF';
	}
	gulp.src(imgPath(srcPath))
	.pipe(imageCompress(option))
	.pipe(gulp.dest(`${srcPath}/dist-img`));
});

gulp.task('default', ['start']);