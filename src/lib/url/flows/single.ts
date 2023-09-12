import { type BFurl, REQ_PARAMS } from '@lib'

export type UrlLike = string | URL

export const singleFlow = (url: BFurl, post: string) => {
	// only add post once
	if (!url.pathname.includes(post)) url.pathname += post

	// cleanup all params
	url.search = REQ_PARAMS + ''

	// and labels
	return url.clearLabels()
}
