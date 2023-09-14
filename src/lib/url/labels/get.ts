import { type BFLabel } from '@lib'

export const getLabels = (store: Set<string>): BFLabel[] =>
	Array.from(store, (lab: BFLabel) =>
		(lab = (lab + '').split(',')).length === 1 ? lab[0] : lab,
	).sort()
