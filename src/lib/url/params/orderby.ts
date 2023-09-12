import { type BFurl } from '@lib'

export const OK_ORDERBY = new Set(['published', 'updated'])
export type OrderbyLike = 'published' | 'updated'

export const getOrderBy = (url: BFurl): OrderbyLike | null =>
	url.searchParams.get('orderby') as OrderbyLike

export const setOrderBy = (url: BFurl, str: OrderbyLike) =>
	OK_ORDERBY.has(str) && url.searchParams.set('orderby', str)
