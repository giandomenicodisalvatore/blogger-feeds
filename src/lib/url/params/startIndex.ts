import { type BFUrl } from '@lib'

export const getStartIndexParam = (url: BFUrl) =>
	Number(url.searchParams.get('start-index')) || null

export const setStartIndexParam = (url: BFUrl, idx: number) => {
	if (Number.isSafeInteger(idx) && idx >= 1)
		return url.searchParams.set('start-index', idx + '')
}
