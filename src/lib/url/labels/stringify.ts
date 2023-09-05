import { type BloggerFeedsUrl, getLabelsParam } from '@lib'
import { wMemo } from 'weaken-it'

export const stringifyLabels = wMemo(_stringifyLabels)

function _stringifyLabels(url: BloggerFeedsUrl) {
	let labels = getLabelsParam(url),
		stringed = ''

	while (labels.length)
		stringed += `${stringed ? '|' : ''}label:${labels.shift()}`

	return stringed
}
