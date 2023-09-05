export type DateLike = Date | string

export function isoDateStr(date: DateLike = new Date()) {
	return !isNaN((date = new Date(date)).valueOf())
		? date.toJSON().slice(0, -5) // yyyy-mm-ddThh:mm:ss
		: null
}
