import {
	type BFurl,
	FEEDS_PATH,
	getPostId,
	paginatedPosts,
	singlePost,
} from '@lib'
import { wSure } from 'weaken-it'

export function urlSetup(url: BFurl, stringify?: false): BFurl

export function urlSetup(url: BFurl, stringify: true): string

export function urlSetup(url: any, stringify = false) {
	const post = wSure(url, 'post', getPostId(url.pathname))

	// default path
	if (!url.pathname.includes(FEEDS_PATH))
		url.pathname += FEEDS_PATH.substring(Number(url.pathname.endsWith('/')))

	// switch flow
	url = typeof post === 'string' ? singlePost(url, post) : paginatedPosts(url)

	return stringify // consistency
		? decodeURIComponent(URL.prototype.toString.apply(url))
		: url
}
