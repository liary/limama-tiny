'use strict';

var data = { };

exports.set = function(key, value) {
	if (typeof key === 'object') {
		Object.keys(key).forEach(function(k) {
			data[k] = key[k];
		});
	} else {
		data[key] = value;
	}
};

exports.get = function(key) { return data[key]; };