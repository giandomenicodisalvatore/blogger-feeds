import { matchLabels } from '@lib/url'

export const destrQ = (str: string) => {
	let labels: any = matchLabels(str) ?? '',
		terms = str.replace(labels ?? '', '')?.trim(),
		found = { labels: '', terms: '' }

	labels = labels
		?.split('|')
		?.map((e: string) => (e.includes(',') ? e.split(',') : e))

	return Object.assign(found, { terms, labels })
}
