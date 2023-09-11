import { type BFurl, FEEDS_PARAMS } from '@lib'

export type UrlLike = string | URL

export const singlePost = (url: BFurl, post: string) => {
	// only add post once
	if (!url.pathname.includes(post)) url.pathname += post

	// cleanup all params
	url.search = FEEDS_PARAMS + ''

	return url.clearLabels()
}
