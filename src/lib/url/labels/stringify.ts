import { type BFUrl, getLabelsParam } from '@lib'
import { wMemo } from 'weaken-it'

export const stringifyLabelsFn = (url: BFUrl) => {
	let labels = getLabelsParam(url),
		stringed = ''

	while (labels.length)
		stringed += `${stringed ? '|' : ''}label:${labels.shift()}`

	return stringed
}

export const stringifyLabels = wMemo(stringifyLabelsFn)
