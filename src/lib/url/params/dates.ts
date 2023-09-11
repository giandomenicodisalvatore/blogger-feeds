import {
	type DateParamLike,
	type DateLike,
	type BFurl,
	DATE_PARAMS,
	isoDateStr,
} from '@lib'

export const getDateParams = (url: BFurl, par: DateParamLike) =>
	(DATE_PARAMS.has(par) && url.searchParams.get(par)) || ''

export const setDateParams = (url: BFurl, par: DateParamLike, date: DateLike) =>
	DATE_PARAMS.has(par) &&
	(date = isoDateStr(date)) &&
	url.searchParams.set(par, date)
