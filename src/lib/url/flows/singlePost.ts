import { POSTID_RGX, type BFUrl, FEEDS_PARAMS } from '@lib'
import { wit } from 'weaken-it'

export type UrlLike = string | URL

export const singlePost = (url: BFUrl) => {
	// postId exists, can be safely added
	url.pathname += `${wit(url, 'post')}`

	// cleanup unrequired params
	url.search = FEEDS_PARAMS + ''
}

export const getPostId = (str: UrlLike) =>
	(str + '').match(POSTID_RGX)?.at(0) ?? null
