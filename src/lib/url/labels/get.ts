import { type BFurl, type LabelLike } from '@lib'
import { wSure } from 'weaken-it'

export const getLabels = (url: BFurl): LabelLike[] =>
	Array.from(wSure(url, 'labels', new Set()), (lab: LabelLike) =>
		(lab = (lab + '').split(',')).length === 1 ? lab[0] : lab,
	).sort()
