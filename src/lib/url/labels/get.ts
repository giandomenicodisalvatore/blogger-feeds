import { type BloggerFeedsUrl, type LabelLike } from '@lib'
import { wMemo, wSure } from 'weaken-it'

export const getLabelsParam = wMemo(_getLabelsParam)

function _getLabelsParam(url: BloggerFeedsUrl): LabelLike[] {
	return Array.from(wSure(url, 'labels', new Set()))
}
