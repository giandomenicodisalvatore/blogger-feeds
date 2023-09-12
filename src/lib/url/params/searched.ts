import { type BFurl } from '@lib'

export const getSearched = (url: BFurl) => url.searchParams.get('q') ?? ''

export const setSearched = (url: BFurl, str: string) =>
	(str = str?.trim()) && url.searchParams.set('q', str)
