import { type BFUrl, REQ_PARAMS } from '@lib'

export const singleFlow = (url: BFUrl, post: string) => {
	// only add post once
	if (!url.pathname.includes(post)) url.pathname += post

	// cleanup all params
	url.search = REQ_PARAMS + ''

	// and labels
	return url.clearLabels()
}
