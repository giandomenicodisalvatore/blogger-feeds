import { type BuildMutator, useSP } from '@lib/url'

export type Label = string | string[]

interface SearchConf {
	labels?: Label[]
	terms?: string
}

declare module '@lib/url' {
	interface PagedConf extends SearchConf {}
}

const normalizeLabels = (label: Label): string =>
	Array.isArray(label)
		? label.map(normalizeLabels).filter(Boolean).sort().join(',')
		: label?.trim() ?? ''

const stringifyLabels = (labels: Label[]): string =>
	Array.from(new Set(labels.map(normalizeLabels)))
		.filter(Boolean)
		.map(l => 'label:' + l)
		.sort()
		.join('|')

export const search: BuildMutator = (url, conf) => {
	const merged = [
		conf.labels ? stringifyLabels(conf.labels) : '',
		conf.terms?.trim() ?? '',
	]
		.join(' ')
		.trim()
	if (merged) useSP(url, 'q', merged)
}
