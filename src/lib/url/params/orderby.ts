import { type BloggerOrderBy, type BFurl, ALLOWED_ORDERBY } from '@lib'

export const getOrderByParam = (url: BFurl): BloggerOrderBy | null =>
	url.searchParams.get('orderby') as BloggerOrderBy

export const setOrderByParam = (url: BFurl, str: BloggerOrderBy) =>
	ALLOWED_ORDERBY.has(str) && url.searchParams.set('orderby', str)
