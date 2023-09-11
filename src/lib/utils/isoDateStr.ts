export type DateLike = Date | string

// yyyy-mm-ddThh:mm:ss
export const isoDateStr = (date: DateLike) =>
	new Date(date).toJSON()?.split('.')?.at(0) ?? ''

/**
 *  Blogspot sends UTC + timezone offset
 * 	* yyyy-mm-ddThh:mm:ss.nnnZ+02:00 (Rome daylight saving)
 *
 * 	But doesn't support it in url params,
 * 	it works without milliseconds and offset
 * 	* yyyy-mm-ddThh:mm:ss
 */
