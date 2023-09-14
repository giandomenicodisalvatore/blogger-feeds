import { type BFUrl } from '@lib'

export type OrderbyStr = 'published' | 'updated'
export const OK_ORDERBY = new Set(['published', 'updated'])

export const getOrderBy = (url: BFUrl): OrderbyStr | null =>
	url.searchParams.get('orderby') as OrderbyStr

export const setOrderBy = (url: BFUrl, str: OrderbyStr) =>
	OK_ORDERBY.has(str) && url.searchParams.set('orderby', str)
