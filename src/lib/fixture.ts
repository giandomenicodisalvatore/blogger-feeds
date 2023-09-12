export const FEEDS_PATH = '/feeds/posts/default/'

export const FEEDS_PARAMS = new URLSearchParams({
	rewriteforssl: 'true',
	dynamicviews: '1',
	alt: 'json',
	v: '2',
}) // sorted once
FEEDS_PARAMS.sort()

export const POSTID_RGX = /\d{7,}/

export const ALLOWED_ORDERBY = new Set(['published', 'updated'])
export type BloggerOrderBy = 'published' | 'updated'

export const ALLOWED_MAX_RESULTS = new Set([1, 150])

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

export const ALLOWED_PARAMS = new Set([
	// always
	...FEEDS_PARAMS.keys(),
	// pagination
	'max-results',
	'orderby',
	// optional
	...DATE_PARAMS,
	'start-index',
	'q',
])

export const MINIMAL_REQUEST = {
	headers: { accept: 'application/json' },
	keepalive: true,
}
