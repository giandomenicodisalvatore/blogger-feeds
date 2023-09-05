export function numClamp(num: number, range: number[]) {
	const min = Math.min(...range),
		max = Math.max(...range)
	return (num <= min && min) || (num >= max && max) || num
}
