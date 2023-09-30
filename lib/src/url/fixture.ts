/**
 * Default blogger feeds origin
 */
export const BLOGGER = 'https://www.blogger.com'

/**
 * Path required by all flows
 * * adpted to blogger if necessary
 */
export const REQ_PATH = '/feeds/posts/default'

/**
 * Params shared by all flows
 * * always required
 * * pre-sorted
 */
export const REQ_PARS = new URLSearchParams({
	rewriteforssl: 'true',
	dynamicviews: '1',
	alt: 'json',
	v: '2',
})
REQ_PARS.sort()

/**
 * Allowed max-results param values
 */
export const OK_MAXRES = {
	max: 150,
	def: 25,
	min: 1,
}

/**
 * Allowed orderby param values
 */
export const OK_ORDERBY = new Set<Ordering | any>(['published', 'updated'])
export type Ordering = 'published' | 'updated'

/**
 * Allowed date filtering keys
 */
export const OK_DATES = new Set<DatePar>([
	'published-max',
	'published-min',
	'updated-max',
	'updated-min',
])

export type DatePar =
	| 'published-max'
	| 'published-min'
	| 'updated-max'
	| 'updated-min'

/**
 * All of the allowed params
 */
export const ALLOWED_PARS = new Set([
	...Array.from(REQ_PARS.keys()),
	...Array.from(OK_DATES),
	'start-index',
	'max-results',
	'orderby',
	'q',
])
