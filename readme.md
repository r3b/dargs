# dargs [![Build Status](https://travis-ci.org/sindresorhus/dargs.png?branch=master)](https://travis-ci.org/sindresorhus/dargs)

> Converts an object of options into an array of command-line arguments

Basically the inverse of an argument parser like nopt or minimist.

>Forked from https://github.com/sindresorhus/dargs

The differences are...

	- camelCase option names are not modified to dash-separated-words
	- objects are flattened and included as '--key.subkey value'


## Install

```bash
$ npm install --save dargs-object
```


#### Example

```js
var dargs = require('dargs-object');

var options = {
	foo: 'bar',
	hello: true,                    // results in only the key being used
	cake: false,                    // ignored
	camelCase: 5,                   // camelCase is slugged to `camel-case`
	multiple: ['value', 'value2'],  // converted to multiple arguments
	object: {test:'value'},
	sad: ':('
};

var excludes = ['sad'];

console.log(dargs(options, excludes));

/*
[
	'--foo', 'bar',
	'--hello',
	'--camel-case', '5',
	'--multiple', 'value',
	'--multiple', 'value2',
	'--object.test', 'value'
]
*/
```


## API

### dargs(options, excludes)

#### options

Type: `Object`

Options to convert to command-line arguments.

#### excludes

Type: `Array`

Keys to exclude.


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
