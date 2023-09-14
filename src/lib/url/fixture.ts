import { type OrderbyStr } from '@lib'

export const REQ_PATH = '/feeds/posts/default/'

export const REQ_PARAMS = new URLSearchParams({
	rewriteforssl: 'true',
	dynamicviews: '1',
	alt: 'json',
	v: '2',
}) // sorted once
REQ_PARAMS.sort()

export const DATE_PARAMS: Set<DateKeyStr> = new Set([
	'published-max',
	'published-min',
	'updated-max',
	'updated-min',
])

export type DateKeyStr =
	| 'published-max'
	| 'published-min'
	| 'updated-max'
	| 'updated-min'

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

export const DEF_ORDERBY = 'published'

export const DEF_MAXRES = 10
