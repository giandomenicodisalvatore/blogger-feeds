import { type DateParamLike, type BFurl, DATE_PARAMS } from '@lib'

export type DateLike = Date | string

// yyyy-mm-ddThh:mm:ss
export const isoDateStr = (date: DateLike) =>
	new Date(date).toJSON()?.split('.')?.at(0) ?? ''

export const getDates = (url: BFurl, par: DateParamLike) =>
	(DATE_PARAMS.has(par) && url.searchParams.get(par)) || ''

export const setDates = (url: BFurl, par: DateParamLike, date: DateLike) =>
	DATE_PARAMS.has(par) &&
	(date = isoDateStr(date)) &&
	url.searchParams.set(par, date)

/**
 *  Blogspot sends UTC + timezone offset
 * 	* yyyy-mm-ddThh:mm:ss.nnnZ+02:00 (Rome daylight saving)
 *
 * 	But doesn't support it in url params,
 * 	it works without milliseconds and offset
 * 	* yyyy-mm-ddThh:mm:ss
 */
