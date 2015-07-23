'use strict';
var stringLength = require('string-length');
var ansiRegex = require('ansi-regex');

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
		var words = str.match(regex);
		var spaceLeft = width;
		var result = '';

		for (var i = 0; i < words.length; i++) {
			var current = words[i];

			if (current === '\n') {
				result = result + linebreak;
				spaceLeft = width;
				continue;
			}

			if (stringLength(current) > width) {
				var overflow = wrap( current.substr(spaceLeft), { width: width } );
				result += current.substr(0, spaceLeft) + linebreak + overflow;
				spaceLeft = recursiveSpaceLeft;
			} else {
				if (stringLength(current) > spaceLeft) {
					result = result + linebreak + current;
					spaceLeft = width - stringLength(current);
				} else {
					result += current;
					spaceLeft -= stringLength(current);
				}
			}
		};

		recursiveSpaceLeft = spaceLeft;

		return result;
	})(str, opts);
};
