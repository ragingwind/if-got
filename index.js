'use strict';

const got = require('got');

const endpoint = 'https://api.iconfinder.com/v2/';
const query = p => {
	let id = {
		count: 50,
		after: ''
	};

	p = p.replace(endpoint, '');

	if (/iconsets$/.test(p)) {
		Object.assign(id, {
			premium: 'all',
			vector: 'all',
			license: 'none'
		});
	} else if (/^icons\/search$/.test(p)) {
		Object.assign(id, {
			offset: 0,
			minimum_size: 192,
			maximum_size: 512
		});
	} else if (!/^iconsets.*icons$/.test(p) &&
					!/categories$/.test(p) &&
					!/^styles/.test(p)) {
		id = {};
	}

	return id;
};
const hasSearchQuery = q => q && q.query && typeof q.query === 'string';

function icGot(path, opts) {
	if (typeof path !== 'string') {
		return Promise.reject(new TypeError(`Expected 'path' to be a string, got ${typeof path}`));
	}

	const url = /https?/.test(path) ? path : endpoint + path;

	if (/icons\/search$/.test(path) && (!opts || !hasSearchQuery(opts.query))) {
		return Promise.reject(new TypeError(`Expected 'query' to be a string`));
	}

	opts = Object.assign({
		json: true,
		query: query(url)
	}, opts);

	if (opts.stream) {
		return got.stream(url, opts);
	}

	console.log(url, opts);

	return got(url, opts);
}

// rest of method is not supported yet
const helpers = [
	'get' // 'post', 'put', 'patch', 'head', 'delete'
];

icGot.stream = (url, opts) => icGot(url, Object.assign({}, opts, {json: false, stream: true}));

for (const x of helpers) {
	const method = x.toUpperCase();
	icGot[x] = (url, opts) => icGot(url, Object.assign({}, opts, {method}));
	icGot.stream[x] = (url, opts) => icGot.stream(url, Object.assign({}, opts, {method}));
}

module.exports = icGot;
