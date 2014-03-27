/*
	forked from https://github.com/sindresorhus/dargs
	The differences are...
	- camelCase option names are not modified to dash-separated-words
	- objects are flattened and included as '--key.subkey value'
*/
 
'use strict';

/*
	https://gist.github.com/penguinboy/762197
	Thanks, penguinboy!
 */
var flattenObject = function(ob) {
	if(Array.isArray(ob) || "object"!==typeof ob){
		return ob;
	}else{
		return Object.keys(ob)
			.filter(function(key){return ob.hasOwnProperty(key)})
			.reduce(function(options,key){
				if (ob[key]!==null && (typeof ob[key]) === 'object') {
					var flatObject = flattenObject(ob[key]);
					Object.keys(flatObject)
						.filter(function(key2){return flatObject.hasOwnProperty(key2)})
						.forEach(function(key2){
							options[key + '.' + key2] = flatObject[key2];
						})
				} else {
					options[key] = ob[key];
				}
				return options;
			},{});
	}
};
module.exports = function (options, excludes) {
	var args = [];
	Object.keys(options)
		.filter(function(key){
			return options.hasOwnProperty(key) && options[key]!==null
		})
		.forEach(function (key) {
			var flag;
			var val = options[key];

			if (Array.isArray(excludes) && excludes.indexOf(key) !== -1) {
				return;
			}

			flag = key;//.replace(/[A-Z]/g, '-$&').toLowerCase();

			if (val === true) {
				args.push('--' + flag);
			}

			if (typeof val === 'string') {
				args.push('--' + flag, val);
			}

			if (typeof val === 'number' && isNaN(val) === false) {
				args.push('--' + flag, '' + val);
			}
			if(typeof val === 'object' && !Array.isArray(val)){
				var flattened=flattenObject(val)
				Object.keys(flattened).forEach(function(k){
					args.push('--' + flag+'.'+k, flattened[k]);
				})
			}else if (Array.isArray(val)) {
				val.forEach(function (arrVal) {
					args.push('--' + flag, arrVal);
				});
			}
		});

	return args;
};
