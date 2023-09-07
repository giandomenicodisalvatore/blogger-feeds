import { ALLOWED_PARAMS, stringifyLabels, type BFUrl, FEEDS_PARAMS } from '@lib'

export const paginatedPosts = (url: BFUrl) => {
	// enforce required params
	url['orderby'] ??= 'published'
	url['max-results'] ??= 150

	// merge search and lables
	url['searched'] = stringifyLabels(url) + ' ' + url['searched']

	// cleanup empty or unallowed
	url.searchParams.forEach((v, k) => {
		if (!ALLOWED_PARAMS.has(k) || !v) url.searchParams.delete(k)
	})

	// sort for cache matching
	url.searchParams.sort()
}
