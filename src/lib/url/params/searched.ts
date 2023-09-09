import { type BFUrl } from '@lib'

export const getSearchedParam = (url: BFUrl) => url.searchParams.get('q') ?? ''

export const setSearchedParam = (url: BFUrl, str: string) => {
	if ((str = str?.trim())) return url.searchParams.set('q', str)
}
