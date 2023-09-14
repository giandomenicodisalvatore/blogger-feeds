import { type DateKeyStr, type BFUrl, DATE_PARAMS } from '@lib'

export type DateStr = Date | string

// yyyy-mm-ddThh:mm:ss
export const isoDateStr = (date: DateStr) =>
	new Date(date).toJSON()?.split('.')?.at(0) ?? ''

export const getDates = (url: BFUrl, par: DateKeyStr) =>
	(DATE_PARAMS.has(par) && url.searchParams.get(par)) || ''

export const setDates = (url: BFUrl, par: DateKeyStr, date: DateStr) =>
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
