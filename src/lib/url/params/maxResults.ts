import { ALLOWED_MAX_RESULTS, type BFurl, numClamp } from '@lib'

export const getMaxResultsParam = (url: BFurl) =>
	Number(url.searchParams.get('max-results')) || null

export const setMaxResultsParam = (url: BFurl, num: number) =>
	Number.isSafeInteger((num = numClamp(num, ...ALLOWED_MAX_RESULTS))) &&
	url.searchParams.set('max-results', num + '')
