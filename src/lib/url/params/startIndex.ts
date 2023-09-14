import { type BFUrl } from '@lib'

export const getStartIndex = (url: BFUrl) =>
	Number(url.searchParams.get('start-index')) || null

export const setStartIndex = (url: BFUrl, idx: number) =>
	Number.isSafeInteger(idx) &&
	idx >= 1 &&
	url.searchParams.set('start-index', idx + '')
