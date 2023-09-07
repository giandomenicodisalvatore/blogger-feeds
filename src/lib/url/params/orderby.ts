import { ALLOWED_ORDERBY, type BFUrl } from '@lib'

export const getOrderByParam = (url: BFUrl) =>
	url.searchParams.get('orderby') ?? ''

export const setOrderByParam = (url: BFUrl, str: string) =>
	void ALLOWED_ORDERBY.has(str) && url.searchParams.set('orderby', str)
