export type DateLike = Date | string

export const isoDateStr = (date: DateLike) =>
	// yyyy-mm-ddThh:mm:ss (.nnnZ)
	new Date(date).toJSON()?.slice(0, -5) ?? ''
