import { type BFurl } from '@lib'

export const getStartIndex = (url: BFurl) =>
	Number(url.searchParams.get('start-index')) || null

export const setStartIndex = (url: BFurl, idx: number) =>
	Number.isSafeInteger(idx) &&
	idx >= 1 &&
	url.searchParams.set('start-index', idx + '')
