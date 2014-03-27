/*global describe, it */
'use strict';
var assert = require('assert');
var dargs = require('./dargs');


var fixture = {
	a: 'foo',
	b: true,
	c: false,
	d: 5,
	e: ['foo', 'bar'],
	f: null,
	g: undefined,
	camelCaseCamel: true,
	h: {
		i: 'hi',
		j: {
			k:'jk'
		}
	}
};

describe('dargs()', function () {
	it('convert options to cli flags', function () {
		var actual = dargs(fixture);
		var expected = [
			'--a', 'foo',
			'--b',
			'--d', '5',
			'--e', 'foo',
			'--e', 'bar',
			'--camelCaseCamel',
			'--h.i', 'hi',
			'--h.j.k', 'jk'
		];
		assert.deepEqual(actual, expected);
	});

	it('exclude options', function () {
		var actual = dargs(fixture, ['b', 'e']);
		var expected = [
			'--a', 'foo',
			'--d', '5',
			'--camelCaseCamel',
			'--h.i', 'hi',
			'--h.j.k', 'jk'
		];
		assert.deepEqual(actual, expected);
	});
});
