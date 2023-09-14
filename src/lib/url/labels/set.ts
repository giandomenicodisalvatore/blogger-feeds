import { type BFLabel, normalizeLabels } from '@lib'

export const setLabels = (store: Set<string>, labels: BFLabel[]) => {
	let single

	while (labels.length)
		(single = labels.shift()) &&
			(single = normalizeLabels(single)) &&
			store.add(single)
}
