export const REQ_PATH = '/feeds/posts/default/'

export const REQ_PARAMS = new URLSearchParams({
	rewriteforssl: 'true',
	dynamicviews: '1',
	alt: 'json',
	v: '2',
}) // sorted once
REQ_PARAMS.sort()

export type DateParamLike =
	| 'published-max'
	| 'published-min'
	| 'updated-max'
	| 'updated-min'

export const DATE_PARAMS: Set<DateParamLike> = new Set([
	'published-max',
	'published-min',
	'updated-max',
	'updated-min',
])

export const OK_PARAMS = new Set([
	// always
	...REQ_PARAMS.keys(),
	// pagination
	'max-results',
	'orderby',
	// optional
	...DATE_PARAMS,
	'start-index',
	'q',
])
