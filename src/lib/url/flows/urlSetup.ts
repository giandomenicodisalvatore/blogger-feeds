import {
	type BFIds,
	type BFUrl,
	REQ_PATH,
	paginatedFlow,
	singleFlow,
	isBlogspot,
} from '@lib'

export function urlSetup(url: BFUrl, ids: BFIds, str?: false): BFUrl
export function urlSetup(url: BFUrl, ids: BFIds, str: true): string
export function urlSetup(url: any, ids: any, str = false) {
	if (!url.href.includes(REQ_PATH.slice(1, -1)))
		// enforce default blogger path
		url.pathname = REQ_PATH

	// blogger adapter
	if (isBlogspot(url.href) && ids.blog && !url.pathname.includes(ids.blog))
		url.pathname = url.pathname.replace('feeds', `feeds/${ids.blog}`)

	// switch flow
	url = ids.post ? singleFlow(url, ids.post) : paginatedFlow(url)

	return str // for consistency
		? decodeURIComponent(URL.prototype.toString.apply(url))
		: url
}
