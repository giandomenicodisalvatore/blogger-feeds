export const FEEDS_PATH = '/feeds/posts/default/'

export const FEEDS_PARAMS = new URLSearchParams({
	rewriteforssl: 'true',
	dynamicviews: '1',
	alt: 'json',
	v: '2',
})
FEEDS_PARAMS.sort() // sorted once

export const POSTID_RGX = /\d{7,}/

export const ALLOWED_ORDERBY = new Set(['published', 'updated'])

export const ALLOWED_MAX_RESULTS = new Set([1, 150])

export const DATE_PARAMS = new Set([
	'published-max',
	'published-min',
	'updated-max',
	'updated-min',
])

export const ALLOWED_PARAMS = new Set([
	...FEEDS_PARAMS.keys(),
	...DATE_PARAMS,
	'max-results',
	'orderby',
	'q',
])
