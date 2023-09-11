import { type BFurl } from '@lib'

export const getSearchedParam = (url: BFurl) => url.searchParams.get('q') ?? ''

export const setSearchedParam = (url: BFurl, str: string) =>
	(str = str?.trim()) && url.searchParams.set('q', str)
