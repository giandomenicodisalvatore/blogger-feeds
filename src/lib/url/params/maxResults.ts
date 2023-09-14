import { type BFUrl } from '@lib'

export const MAXRES_RANGE = [1, 150]

/* export const numClamp = (num: number, ...range: number[]) => {
	const [max, min] = [Math.max(...range), Math.min(...range)]
	num = (num <= min && min) || (num >= max && max) || num
	return num
} */

export const numClamp = (num: number, ...range: number[]) => {
	const [max, min] = [Math.max(...range), Math.min(...range)]
	return Math.max(min, Math.min(num, max)) || max || min
}

export const getMaxResults = (url: BFUrl) =>
	Number(url.searchParams.get('max-results')) || null

export const setMaxResults = (url: BFUrl, num: number) =>
	(num = Math.round(numClamp(num, ...MAXRES_RANGE))) &&
	url.searchParams.set('max-results', num + '')
