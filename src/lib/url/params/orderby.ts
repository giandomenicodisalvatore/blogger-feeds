import { type BloggerOrderBy, type BFUrl, ALLOWED_ORDERBY } from '@lib'

export const getOrderByParam = (url: BFUrl): BloggerOrderBy | null =>
	url.searchParams.get('orderby') as BloggerOrderBy

export const setOrderByParam = (url: BFUrl, str: BloggerOrderBy) => {
	if (ALLOWED_ORDERBY.has(str)) return url.searchParams.set('orderby', str)
}
