'use strict';
module.exports = function (str, opts) {	
	var recursiveSpaceLeft = 0;

	return (function wrap(str, opts){
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		opts = opts || {};
		var width = opts.width || 34;
		var linebreak = '\n';

		var regex = /\S+|\s?/g;
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

			if (current.length > width) {
				var overflow = wrap( current.substr(spaceLeft), { width: width } );
				result += current.substr(0, spaceLeft) + linebreak + overflow;
				spaceLeft = recursiveSpaceLeft;
			} else {
				if (current.length > spaceLeft) {
					result = result + linebreak + current;
					spaceLeft = width - current.length;
				} else {
					result += current;
					spaceLeft -= current.length;
				}
			}
		};

		recursiveSpaceLeft = spaceLeft;

		return result;
	})(str, opts);
};
