import { type UrlLike, type BFUrl, POSTID_RGX } from '@lib'
import { wit } from 'weaken-it'

export const getPostParam = (url: BFUrl) => wit(url, 'post') || null

export const setPostParam = (url: BFUrl, post: UrlLike) =>
	(post = getPostId(post) ?? '') && wit(url, 'post', post)

export const getPostId = (str: UrlLike) =>
	(str + '').match(POSTID_RGX)?.at(0) || null
