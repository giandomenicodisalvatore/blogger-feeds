import { ALLOWED_PARAMS, stringifyLabels, type BloggerFeedsUrl } from '@lib'

export function paginatedPosts(url: BloggerFeedsUrl) {
	// enforce required params
	url['orderby'] ??= 'published'
	url['max-results'] ??= 150

	// merge search and lables
	url['searched'] = stringifyLabels(url) + ' ' + url['searched']

	// cleanup useless / unallowed
	for (const [k, v] of url.searchParams.entries())
		if (!ALLOWED_PARAMS.has(k) || !v) url.searchParams.delete(k)

	// sort for cache matching
	url.searchParams.sort()
}
