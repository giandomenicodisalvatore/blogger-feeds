import {
	type BFurl,
	paginatedFlow,
	singleFlow,
	getPostId,
	REQ_PATH,
} from '@lib'
import { wSure } from 'weaken-it'

export function urlSetup(url: BFurl, stringify?: false): BFurl

export function urlSetup(url: BFurl, stringify: true): string

export function urlSetup(url: any, stringify = false) {
	const post = wSure(url, 'post', getPostId(url.pathname))

	// default path
	if (!url.pathname.includes(REQ_PATH))
		url.pathname += REQ_PATH.substring(Number(url.pathname.endsWith('/')))

	// switch flow
	url = typeof post === 'string' ? singleFlow(url, post) : paginatedFlow(url)

	if (stringify)
		// consistency
		url = decodeURIComponent(URL.prototype.toString.apply(url))

	return url
}
