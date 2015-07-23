'use strict';
var assert = require('assert');
var greedyWrap = require('./');

describe('greedy-wrap', function(){
	it('should wrap text with words that overflows the max width', function () {
		assert.strictEqual(greedyWrap('Supercalifragilisticexpialidocious', {width: 10}),
			'Supercalif\nragilistic\nexpialidoc\nious');
	});

	it('should wrap text with short and long words', function () {
		assert.strictEqual(greedyWrap('Supercalifragilisticexpialidocious is a long word!', {width: 10}),
			'Supercalif\nragilistic\nexpialidoc\nious is a \nlong word!');
	});

	it('should wrap text with \\n characters into lines with 10 columns', function () {
		assert.strictEqual(greedyWrap('  this is a dummy text that overflows the max width. New lines \n\nmust be considered.', {width: 10}),
			'  this is \na dummy \ntext that \noverflows \nthe max \nwidth. New\n lines \n\nmust be co\nnsidered.');
	});

	it('should wrap text with \\n characters into lines with 20 columns', function () {
		assert.strictEqual(greedyWrap('  this is a dummy text that overflows the max width. New lines \nmust be considered.', {width: 20}),
			'  this is a dummy \ntext that overflows \nthe max width. New \nlines \nmust be considered.');
	});

	describe('ansi', function(){
		it('should treat ansi codes and short words correctly', function () {
			assert.strictEqual(greedyWrap('\u001b[1mthis\u001b[22m is a text with only \u001b[1mshort\u001b[22m words.', {width: 10}),
				'\u001b[1mthis\u001b[22m is a \ntext with \nonly \u001b[1mshort\u001b[22m\n words.');
		});

		it('should treat ansi codes and long words correctly', function () {
			assert.strictEqual(greedyWrap('\u001b[1mSupercalifragilisticexpialidocious\u001b[22m', {width: 10}),
				'\u001b[1mSupercalif\nragilistic\nexpialidoc\nious\u001b[22m');
		});

		it('should treat ansi codes, short and long words correctly', function () {
			assert.strictEqual(greedyWrap('\u001b[1mSupercalifragilisticexpialidocious\u001b[22m is a \u001b[1mlong\u001b[22m word!', {width: 10}),
				'\u001b[1mSupercalif\nragilistic\nexpialidoc\nious\u001b[22m is a \u001b[1m\nlong\u001b[22m word!');
		});
	});
});
