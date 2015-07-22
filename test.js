'use strict';
var assert = require('assert');
var greedyWrap = require('./');

describe('greedy-wrap', function(){
	it('should wrap text with words that overflows the max width', function () {
		assert.strictEqual(greedyWrap('Supercalifragilisticexpialidocious', {width: 10}),
			'Supercalif\nragilistic\nexpialidoc\nious');
	});

	it('should wrap text with words that overflows the max width', function () {
		assert.strictEqual(greedyWrap('Supercalifragilisticexpialidocious is a long word!', {width: 10}),
			'Supercalif\nragilistic\nexpialidoc\nious is a \nlong word!');
	});

	it('should wrap text into lines with 10 columns', function () {
		assert.strictEqual(greedyWrap('  this is a dummy text that overflows the max width. New lines \n\nmust be considered.', {width: 10}),
			'  this is \na dummy \ntext that \noverflows \nthe max \nwidth. New\n lines \n\nmust be co\nnsidered.');
	});

	it('should wrap text into lines with 20 columns', function () {
		assert.strictEqual(greedyWrap('  this is a dummy text that overflows the max width. New lines \nmust be considered.', {width: 20}),
			'  this is a dummy \ntext that overflows \nthe max width. New \nlines \nmust be considered.');
	});
});
