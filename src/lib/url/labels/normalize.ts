import { wMemo } from 'weaken-it'

export type LabelLike = string | string[]

export const normalizeLabels = wMemo(_normalizeLabels)

function _normalizeLabels(label: LabelLike): string {
	let normalized = [],
		lab

	if (typeof label === 'string' && (label = label.trim()))
		normalized.push(label)

	if (Array.isArray(label))
		while (label.length)
			if ((lab = _normalizeLabels(label.shift() ?? ''))) normalized.push(lab)

	return normalized.sort().join(',')
}
