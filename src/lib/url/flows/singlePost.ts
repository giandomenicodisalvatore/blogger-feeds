import { POSTID_RGX, FEEDS_PARAMS, type BloggerFeedsUrl } from '@lib'
import { wit } from 'weaken-it'

export type UrlLike = string | URL

export function singlePost(url: BloggerFeedsUrl) {
	url.pathname += `${wit(url, 'post') ?? ''}?${FEEDS_PARAMS}`
}

export function getPostId(str: UrlLike) {
	return (str + '').match(POSTID_RGX)?.at(0) ?? null
}
