/**
 * Convert date string to blogger date format
 * * strives to coerce to string
 * @param tz represents the GMT offset (+02:00)
 */
export const BFdate = (date: any, tz?: string): string => {
	if (isNaN((date = new Date((date ??= ''))).valueOf())) return ''
	tz = /^[\+\-]?\d{2}\:\d{2}$/.test((tz ??= '') + '') ? tz : ''
	date = date.toJSON()?.split('.')?.at(0) ?? ''
	return date ? date + tz : ''
}
