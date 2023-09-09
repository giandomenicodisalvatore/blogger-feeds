import { type BFUrl, type LabelLike } from '@lib'
import { wSure } from 'weaken-it'

export const getLabelsParam = (url: BFUrl): LabelLike[] =>
	Array.from(wSure(url, 'labels', new Set())).map(
		lab =>
			(typeof lab === 'string' && lab.includes(',')
				? lab.split(',')
				: lab) as LabelLike,
	)
