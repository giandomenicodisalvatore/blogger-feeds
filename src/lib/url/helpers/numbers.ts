/**
 * Clamp num between min and max
 * * falls back to def
 * * inclusive
 */
export const numClamp = ({
	num,
	min = Number.MIN_SAFE_INTEGER,
	max = Number.MAX_SAFE_INTEGER,
	def,
}: {
	num?: number
	min?: number
	max?: number
	def: number
}) =>
	(num = Math.max(Math.min(Number(num), max), min)) && Number.isSafeInteger(num)
		? num
		: def
