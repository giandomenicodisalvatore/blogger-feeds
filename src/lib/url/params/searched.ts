import { type BloggerFeedsUrl } from '@lib'

export function getSearchedParam(url: BloggerFeedsUrl) {
	return url.searchParams.get('q') ?? ''
}

export function setSearchedParam(url: BloggerFeedsUrl, str: string) {
	if ((str = str.trim())) url.searchParams.set('q', str)
}
