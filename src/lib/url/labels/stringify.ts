import { type BFLabel } from '@lib'

export const stringifyLabels = (labels: BFLabel[]) => {
	let stringed = ''

	while (labels.length)
		stringed += `${stringed ? '|' : ''}label:${labels.shift()}`

	return stringed
}
