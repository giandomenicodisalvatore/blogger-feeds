import {
	type BFUrl,
	FEEDS_PATH,
	FEEDS_PARAMS,
	getPostId,
	paginatedPosts,
	singlePost,
} from '@lib'
import { wSure } from 'weaken-it'

export const urlSetup = (url: BFUrl) => {
	// default path segment
	if (!url.pathname.includes(FEEDS_PATH))
		url.pathname += FEEDS_PATH.substring(Number(url.pathname.endsWith('/')))

	// default required params
	FEEDS_PARAMS.forEach((v, k) => {
		if (url.searchParams.get(k) !== v) url.searchParams.set(k, v)
	})

	// switch flow according to post
	wSure(url, 'post', getPostId(url.pathname))
		? singlePost(url)
		: paginatedPosts(url)

	return url
}
