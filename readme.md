# greedy-wrap [![Build Status](https://travis-ci.org/danilosampaio/greedy-wrap.svg?branch=master)](https://travis-ci.org/danilosampaio/greedy-wrap)

> A recursive greedy algorithm implementation for the word wrap process.
> It also correctly calculate the width of the words containing ansi escape codes.


## Install

```
$ npm install --save greedy-wrap
```


## Usage

```js
var greedyWrap = require('greedy-wrap');

greedyWrap('  this is a dummy text that overflows the max width. New lines \nmust be considered.', {width: 20});

//=> Result:

this is a dummy 
text that overflows 
the max width. New 
lines 
must be considered.


greedyWrap('Supercalifragilisticexpialidocious', {width: 10});

//=> Result:

Supercalif
ragilistic
expialidoc
ious


greedyWrap('Supercalifragilisticexpialidocious', {width: 10, autoWidth: true});

//=> Result:

Supercalifragilisticexpialidocious


greedyWrap('\u001b[1mthis\u001b[22m is a text with only \u001b[1mshort\u001b[22m words.', {width: 10})

//=> Result:

this is a 
text with 
only short
words.
```


## API

### greedyWrap(input, [options])

#### input

*Required*  
Type: `string`


#### options

##### width

Type: `integer`
Default: `34`

The width of the text.


##### autoWidth

Type: `boolean`
Default: `false`

Override the width to the longest word length.

## License

MIT © [Danilo Sampaio](http://github.org/danilosampaio)
