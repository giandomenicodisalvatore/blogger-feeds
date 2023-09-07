import { type UrlLike, type BFUrl, getPostId } from '@lib'
import { wit } from 'weaken-it'

export const getPostParam = (url: BFUrl) => wit(url, 'post') || null

export const setPostParam = (url: BFUrl, post: UrlLike) =>
	void ((post = getPostId(post) ?? '') && wit(url, 'post', post))
