import { type BFurl } from '@lib'
import { wSure } from 'weaken-it'

export const clearLabels = (url: BFurl) =>
	wSure(url, 'labels', new Set()).clear()
