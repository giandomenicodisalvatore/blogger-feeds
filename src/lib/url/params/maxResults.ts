import { ALLOWED_MAX_RESULTS, type BFUrl, numClamp } from '@lib'

export const getMaxResultsParam = (url: BFUrl) =>
	Number(url.searchParams.get('max-results')) || null

export const setMaxResultsParam = (url: BFUrl, num: number) => {
	if (Number.isSafeInteger((num = numClamp(num, ...ALLOWED_MAX_RESULTS))))
		return url.searchParams.set('max-results', num + '')
}
