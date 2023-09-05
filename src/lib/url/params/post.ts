import { type UrlLike, type BloggerFeedsUrl, getPostId } from '@lib'
import { wit } from 'weaken-it'

export function getPostParam(url: BloggerFeedsUrl) {
	return wit(url, 'post')
}

export function setPostParam(url: BloggerFeedsUrl, post: UrlLike) {
	if ((post = getPostId(post) as UrlLike)) wit(url, 'post', post)
}
