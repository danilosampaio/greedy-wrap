'use strict';
var stringLength = require('string-length');
var ansiRegex = require('ansi-regex');
var longestLength = require('longest-length');
var trimLeft = require('trim-left');

module.exports = function (str, opts) {	
	var recursiveSpaceLeft = 0;

	return (function wrap(str, opts){
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		opts = opts || {};
		var width = opts.width || 34;
		var linebreak = '\n';

		var ansi = ansiRegex().toString().split('/')[1];
		var regex = new RegExp(ansi + "|\\S+|\\s?", "g");
		var chunks = str.match(regex);

		if (opts.autoWidth) {
			var longest = longestLength(str);

			if (longest > width){
				width = longest;
			}
		}

		var spaceLeft = width;

		var result = chunks.reduce(function(previous, current){
			if (current === '\n') {
				spaceLeft = width;
				return previous + current;
			}

			if (stringLength(current) > width) {
				var overflowed = wrap( current.substr(spaceLeft), { width: width } );
				var partial = previous + current.substr(0, spaceLeft) + linebreak + trimLeft(overflowed);
				spaceLeft = recursiveSpaceLeft;
				return partial;
			} else {
				if (stringLength(current) > spaceLeft) {
					var trimmed = trimLeft(current);

					if (stringLength(trimmed) === 0) {
						return previous;
					}

					spaceLeft = width - stringLength(current);
					return previous + linebreak + trimLeft(current);
				} else {
					spaceLeft -= stringLength(current);
					return previous + current;
				}
			}
		}, '');

		recursiveSpaceLeft = spaceLeft;

		return result;
	})(str, opts);
};
