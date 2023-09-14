export type BFLabel = string | string[]

export const normalizeLabels = (label: BFLabel): string => {
	let normalized: string[] = [],
		lab

	if (typeof label === 'string' && (label = label.trim()))
		normalized.push(label)

	if (Array.isArray(label))
		while (label.length)
			(lab = normalizeLabels(label.shift() ?? '')) && normalized.push(lab)

	return normalized.sort() + ''
}
