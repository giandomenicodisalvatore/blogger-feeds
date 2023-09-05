import { type BloggerFeedsUrl } from '@lib'
import { wit } from 'weaken-it'

export function clearLabels(url: BloggerFeedsUrl) {
	wit(url, 'labels').clear()
}
