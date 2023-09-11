import { type BFurl, FEEDS_PARAMS, ALLOWED_PARAMS, stringifyLabels } from '@lib'

export const paginatedPosts = (url: BFurl) => {
	// default required params
	FEEDS_PARAMS.forEach(
		(v, k) => url.searchParams.get(k) !== v && url.searchParams.set(k, v),
	)

	// default pagination params
	url['orderby'] ??= 'published'
	url['max-results'] ??= 150

	// merge search and labels
	url['searched'] = stringifyLabels(url.labels) + ' ' + url['searched']

	// cleanup empty or unallowed
	url.searchParams.forEach(
		(v, k) => (ALLOWED_PARAMS.has(k) && v) || url.searchParams.delete(k),
	)

	// sort for cache matching
	url.searchParams.sort()

	return url
}
