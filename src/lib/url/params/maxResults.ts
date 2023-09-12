import { type BFurl } from '@lib'

export const OK_MAXRES = new Set([1, 150])

export const numClamp = (num: number, ...range: number[]) => {
	let min, max
	return (
		(num <= (min = Math.min(...range)) && min) ||
		(num >= (max = Math.max(...range)) && max) ||
		num
	)
}

export const getMaxResults = (url: BFurl) =>
	Number(url.searchParams.get('max-results')) || null

export const setMaxResults = (url: BFurl, num: number) =>
	Number.isSafeInteger((num = numClamp(num, ...OK_MAXRES))) &&
	url.searchParams.set('max-results', num + '')
