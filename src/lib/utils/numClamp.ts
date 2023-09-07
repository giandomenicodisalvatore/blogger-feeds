export const numClamp = (num: number, ...range: number[]) => {
	let min, max
	return (
		(num <= (min = Math.min(...range)) && min) ||
		(num >= (max = Math.max(...range)) && max) ||
		num
	)
}
