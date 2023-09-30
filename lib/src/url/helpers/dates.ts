/**
 * Convert date string to blogger date format
 * * strives to coerce any param to string
 * * tz is optional, may be unpredictable on blogger
 * @param tz represents the GMT offset (+02:00)
 */
export const isoDate = (date: any, tz?: string): string => {
	// validates date string by coercion
	if (isNaN((date = new Date((date ??= ''))).valueOf())) return ''
	// valid timezone may be kept as-is or ignored
	tz = /^[\+\-]?\d{2}\:\d{2}$/.test((tz ??= '') + '') ? tz : ''
	// all is good, coerce to blogger format
	return date.toJSON().split('.').at(0) + tz
}
