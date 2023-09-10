import { DATE_PARAMS, isoDateStr, type DateLike, type BFUrl } from '@lib'

export type DateParamLike =
	| 'published-max'
	| 'published-min'
	| 'updated-max'
	| 'updated-min'

export const getDateParams = (url: BFUrl, par: DateParamLike) =>
	(DATE_PARAMS.has(par) && url.searchParams.get(par)) || ''

export const setDateParams = (url: BFUrl, par: DateParamLike, date: DateLike) =>
	DATE_PARAMS.has(par) &&
	(date = isoDateStr(date)) &&
	url.searchParams.set(par, date)
