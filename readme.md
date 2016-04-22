# if-got [![Build Status](https://travis-ci.org/ragingwind if-got.svg?branch=master)](https://travis-ci.org/ragingwind if-got)

> [got](https://github.com/sindresorhus/got) extension for [Iconfinder API](http://developer.iconfinder.com/)


## Install

```
$ npm install --save if-got
```


## Usage

```js
const ifGot = require('if-got');

ifGot('icons/search', {query: {query: 'app'}}).then(res => {
	console.log(res.body.total_count);
});
```

Or:

```js
const ifGot = require('if-got');

ifGot('https://api.iconfinder.com/v2/icons/search', {query: {query: 'app'}}).then(res => {
	console.log(res.body.total_count);
});
```


## API

Supporting APIs same as [got](https://github.com/sindresorhus/got) even stream API, but `GET` method only is only supported now.

## License

MIT © [Jimmy Moon](http://ragingwind.me)
