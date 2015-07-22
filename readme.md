# greedy-wrap [![Build Status](https://travis-ci.org/danilosampaio/greedy-wrap.svg?branch=master)](https://travis-ci.org/danilosampaio/greedy-wrap)

> A recursive greedy algorithm implementation for the word wrap process.


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


## License

MIT © [Danilo Sampaio](http://github.org/danilosampaio)
