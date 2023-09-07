import { type BloggerFeedsUrl } from '@lib'

export const getStartIndexParam = (url: BloggerFeedsUrl) =>
	Number(url.searchParams.get('start-index'))

export const setStartIndexParam = (url: BloggerFeedsUrl, idx: number) =>
	void (Number.isSafeInteger(idx) && idx >= 1) &&
	url.searchParams.set('start-index', idx + '')
