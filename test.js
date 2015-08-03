'use strict';
var assert = require('assert');
var greedyWrap = require('./');

describe('greedy-wrap', function () {
	it('should wrap text with words that overflows the max width', function () {
		assert.strictEqual(greedyWrap('Supercalifragilisticexpialidocious', {width: 10}),
			'Supercalif\nragilistic\nexpialidoc\nious');
	});

	it('should override the width to the longest word length', function () {
		assert.strictEqual(greedyWrap('Supercalifragilisticexpialidocious', {width: 10, autoWidth: true}),
			'Supercalifragilisticexpialidocious');
	});

	it('should wrap text with short and long words', function () {
		assert.strictEqual(greedyWrap('Supercalifragilisticexpialidocious is a long word!', {width: 10}),
			'Supercalif\nragilistic\nexpialidoc\nious is a \nlong word!');
	});

	it('should wrap text with \\n characters into lines with 10 columns', function () {
		assert.strictEqual(greedyWrap('  this is a dummy text that overflows the max width. New lines \n\nmust be considered.', {width: 10}),
			'  this is \na dummy \ntext that \noverflows \nthe max \nwidth. New\nlines \n\nmust be co\nnsidered.');
	});

	it('should wrap text with \\n characters into lines with 20 columns', function () {
		assert.strictEqual(greedyWrap('  this is a dummy text that overflows the max width. New lines \nmust be considered.', {width: 20}),
			'  this is a dummy \ntext that overflows \nthe max width. New \nlines \nmust be considered.');
	});

	it('should add a new line containing only one space', function () {
		assert.strictEqual(greedyWrap('Hello, buddy!', {width: 4, autoWidth: true}),
			'Hello,\nbuddy!');
	});

	it('should treat correctly white spaces', function () {
		assert.strictEqual(greedyWrap('aaaaa bbb  cc   ddddd', {width: 5, autoWidth: true}),
			'aaaaa\nbbb  \ncc   \nddddd');
	});

	it('should remove white space at the beginning of the line', function () {
		assert.strictEqual(greedyWrap('aaaaa   bb', {width: 5, autoWidth: true}),
			'aaaaa\nbb');
	});

	it('should treat correctly multiple linebreaks', function () {
		assert.strictEqual(greedyWrap('first line\nthird line\n\nsixth line', {width: 24, autoWidth: true}),
			'first line\nthird line\n\nsixth line');
	});

	describe('ansi', function () {
		it('should treat ansi codes and short words correctly', function () {
			assert.strictEqual(greedyWrap('\u001b[1mthis\u001b[22m is a text with only \u001b[1mshort\u001b[22m words.', {width: 10}),
				'\u001b[1mthis\u001b[22m is a \ntext with \nonly \u001b[1mshort\u001b[22m\nwords.');
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
