import { type BFUrl } from '@lib'
import { wSure } from 'weaken-it'

export const clearLabels = (url: BFUrl) =>
	wSure(url, 'labels', new Set()).clear()
