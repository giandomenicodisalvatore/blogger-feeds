import { type BFUrl } from '@lib'

export const getSearched = (url: BFUrl) => url.searchParams.get('q') ?? ''

export const setSearched = (url: BFUrl, str: string) =>
	(str = str?.trim()) && url.searchParams.set('q', str)
