import { BLOGGER } from '@lib/url'

/**
 * Matches any substring >= 7 digits
 * * returns array of matches
 */
export const matchIds = (str: URL | string) => (str + '').match(/\d{7,}/g)

// simplified
/* export const isBlogger = (str: URL | string) =>
	/^https?\:\/\/www\.blog(ger|spot)\.com/.test(str + '') */

/**
 * Matches default blogger origin
 */
export const isBlogger = (str: URL | string) => (str + '').includes(BLOGGER)

/**
 * Matches the label part of meged q param
 * * returns the entire label string
 */
export const matchLabels = (str: URL | string) =>
	(str + '').match(/^(.*?\|?label\:(?:\w|\,)*){1,}/)?.at(0)
