import { type LabelLike } from '@lib'

export const stringifyLabels = (labels: LabelLike[]) => {
	let stringed = ''

	while (labels.length)
		stringed += `${stringed ? '|' : ''}label:${labels.shift()}`

	return stringed
}
