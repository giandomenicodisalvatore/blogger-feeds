import { wMemo } from 'weaken-it'

export type LabelLike = string | string[]

export const normalizeLabelsFn = (label: LabelLike): string => {
	let normalized: string[] = [],
		lab

	if (typeof label === 'string' && (label = label.trim()))
		normalized.push(label)

	if (Array.isArray(label))
		while (label.length)
			(lab = normalizeLabelsFn(label.shift() ?? '')) && normalized.push(lab)

	return normalized.sort() + ''
}

export const normalizeLabels = wMemo(normalizeLabelsFn)
