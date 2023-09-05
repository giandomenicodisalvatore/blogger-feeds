import { ALLOWED_ORDERBY, type BloggerFeedsUrl } from '@lib'

export function getOrderByParam(url: BloggerFeedsUrl) {
	return url.searchParams.get('orderby') ?? ''
}

export function setOrderByParam(url: BloggerFeedsUrl, str: string) {
	url.searchParams.set('orderby', ALLOWED_ORDERBY.has(str) ? str : 'published')
}
