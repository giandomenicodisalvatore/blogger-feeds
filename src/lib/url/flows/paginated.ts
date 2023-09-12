import { type BFurl, REQ_PARAMS, OK_PARAMS, stringifyLabels } from '@lib'

export const paginatedFlow = (url: BFurl) => {
	// default required params
	REQ_PARAMS.forEach((v, k) => {
		return url.searchParams.get(k) !== v && url.searchParams.set(k, v)
	})

	// default pagination params
	url['orderby'] ??= 'published'
	url['max-results'] ??= 150

	// merge search and labels
	url['searched'] = stringifyLabels(url.labels) + ' ' + url['searched']

	// cleanup empty or unallowed
	url.searchParams.forEach((v, k) => {
		return (OK_PARAMS.has(k) && v) || url.searchParams.delete(k)
	})

	// sort for cache matching
	url.searchParams.sort()

	return url
}
