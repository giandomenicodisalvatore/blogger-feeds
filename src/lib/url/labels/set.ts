import { type BloggerFeedsUrl, type LabelLike, normalizeLabels } from '@lib'
import { wSure } from 'weaken-it'

export const setLabelsParam = _setLabelsParam

function _setLabelsParam(url: BloggerFeedsUrl, ...labels: LabelLike[]) {
	let store = wSure(url, 'labels', new Set()),
		single
	while (labels.length)
		if ((single = normalizeLabels(labels.shift() ?? ''))) store.add(single)
}
