import { ALLOWED_MAX_RESULTS, type BloggerFeedsUrl, numClamp } from '@lib'

export function getMaxResultsParam(url: BloggerFeedsUrl) {
	return url.searchParams.get('max-results')
}

export function setMaxResultsParam(url: BloggerFeedsUrl, num: number) {
	num = numClamp(num, [...ALLOWED_MAX_RESULTS])
	url.searchParams.set('max-results', num + '')
}
