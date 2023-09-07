import { type BFUrl } from '@lib'

export const getStartIndexParam = (url: BFUrl) =>
	Number(url.searchParams.get('start-index'))

export const setStartIndexParam = (url: BFUrl, idx: number) =>
	void (Number.isSafeInteger(idx) && idx >= 1) &&
	url.searchParams.set('start-index', idx + '')
