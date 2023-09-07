import { type BFUrl, type LabelLike, normalizeLabels } from '@lib'
import { wSure } from 'weaken-it'

export const setLabelsParam = (url: BFUrl, ...labels: LabelLike[]) => {
	let store = wSure(url, 'labels', new Set()),
		single
	while (labels.length)
		(single = normalizeLabels(labels.shift() ?? '')) && store.add(single)
}
