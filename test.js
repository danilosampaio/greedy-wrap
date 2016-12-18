import test from 'ava';
import greedyWrap from './';

test('greedy-wrap', t => {
	t.is(greedyWrap('Supercalifragilisticexpialidocious', {width: 10}), 'Supercalif\nragilistic\nexpialidoc\nious');
});

test('should wrap text with words that overflows the max width', t => {
	t.is(greedyWrap('Supercalifragilisticexpialidocious', {width: 10}),
		'Supercalif\nragilistic\nexpialidoc\nious');
});

test('should override the width to the longest word length', t => {
	t.is(greedyWrap('Supercalifragilisticexpialidocious', {width: 10, autoWidth: true}),
		'Supercalifragilisticexpialidocious');
});

test('should wrap text with short and long words', t => {
	t.is(greedyWrap('Supercalifragilisticexpialidocious is a long word!', {width: 10}),
		'Supercalif\nragilistic\nexpialidoc\nious is a \nlong word!');
});

test('should wrap text with \\n characters into lines with 10 columns', t => {
	t.is(greedyWrap('  this is a dummy text that overflows the max width. New lines \n\nmust be considered.', {width: 10}),
		'  this is \na dummy \ntext that \noverflows \nthe max \nwidth. New\nlines \n\nmust be co\nnsidered.');
});

test('should wrap text with \\n characters into lines with 20 columns', t => {
	t.is(greedyWrap('  this is a dummy text that overflows the max width. New lines \nmust be considered.', {width: 20}),
		'  this is a dummy \ntext that overflows \nthe max width. New \nlines \nmust be considered.');
});

test('should add a new line containing only one space', t => {
	t.is(greedyWrap('Hello, buddy!', {width: 4, autoWidth: true}),
		'Hello,\nbuddy!');
});

test('should treat correctly white spaces', t => {
	t.is(greedyWrap('aaaaa bbb  cc   ddddd', {width: 5, autoWidth: true}),
		'aaaaa\nbbb  \ncc   \nddddd');
});

test('should remove white space at the beginning of the line', t => {
	t.is(greedyWrap('aaaaa   bb', {width: 5, autoWidth: true}),
		'aaaaa\nbb');
});

test('should treat correctly multiple linebreaks', t => {
	t.is(greedyWrap('first line\nthird line\n\nsixth line', {width: 24, autoWidth: true}),
		'first line\nthird line\n\nsixth line');
});

test('should treat ansi codes and short words correctly', t => {
	t.is(greedyWrap('\u001b[1mthis\u001b[22m is a text with only \u001b[1mshort\u001b[22m words.', {width: 10}),
		'\u001b[1mthis\u001b[22m is a \ntext with \nonly \u001b[1mshort\u001b[22m\nwords.');
});

test('should treat ansi codes and long words correctly', t => {
	t.is(greedyWrap('\u001b[1mSupercalifragilisticexpialidocious\u001b[22m', {width: 10}),
		'\u001b[1mSupercalif\nragilistic\nexpialidoc\nious\u001b[22m');
});

test('should treat ansi codes, short and long words correctly', t => {
	t.is(greedyWrap('\u001b[1mSupercalifragilisticexpialidocious\u001b[22m is a \u001b[1mlong\u001b[22m word!', {width: 10}),
		'\u001b[1mSupercalif\nragilistic\nexpialidoc\nious\u001b[22m is a \u001b[1m\nlong\u001b[22m word!');
});

test('shoud treat astral codes correctly', t => {
	t.is(greedyWrap('Ayo Silver! 🦄🦄🦄', {width: 15}),
		'Ayo Silver! 🦄🦄🦄');
});
