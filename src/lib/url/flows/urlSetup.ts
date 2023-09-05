import {
	type BloggerFeedsUrl,
	FEEDS_PARAMS,
	FEEDS_PATH,
	getPostId,
	paginatedPosts,
	singlePost,
} from '@lib'

export function urlSetup(url: BloggerFeedsUrl) {
	if (url.pathname.search(FEEDS_PATH) === -1)
		// enforce required path once
		url.pathname += FEEDS_PATH.substring(
			Number(url.pathname.endsWith('/')), // dedupe
		)

	FEEDS_PARAMS.forEach((v, k) => {
		if (!url.searchParams.has(k))
			// enforce required params once
			url.searchParams.set(k, v)
	})

	return (url.post ??= getPostId(url.pathname))
		? singlePost(url)
		: paginatedPosts(url)
}
