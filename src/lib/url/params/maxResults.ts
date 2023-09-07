import { ALLOWED_MAX_RESULTS, type BFUrl, numClamp } from '@lib'

export const getMaxResultsParam = (url: BFUrl) =>
	Number(url.searchParams.get('max-results'))

export const setMaxResultsParam = (url: BFUrl, num: number) =>
	void Number.isSafeInteger((num = numClamp(num, ...ALLOWED_MAX_RESULTS))) &&
	url.searchParams.set('max-results', num + '')
