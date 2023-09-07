import { type BFUrl, type LabelLike } from '@lib'
import { wSure } from 'weaken-it'

export const getLabelsParam = (url: BFUrl): LabelLike[] => [
	...wSure(url, 'labels', new Set()),
]
