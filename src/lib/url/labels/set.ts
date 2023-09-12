import { type BFurl, type LabelLike, normalizeLabels } from '@lib'
import { wSure } from 'weaken-it'

export const setLabels = (url: BFurl, labels: LabelLike[]) => {
	let store = wSure(url, 'labels', new Set()),
		single

	while (labels.length)
		(single = labels.shift()) &&
			(single = normalizeLabels(single)) &&
			store.add(single)
}
