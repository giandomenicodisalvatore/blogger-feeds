import {
	type BuildMutator,
	type Ordering,
	OK_ORDERBY,
	OK_MAXRES,
	numClamp,
	useSP,
} from '@lib/url'

export interface PagedConf {
	'max-results'?: number
	'start-index'?: number
	orderby?: Ordering
}

export const paged: BuildMutator = (url, conf) => {
	// enforce explicitness and consistency
	const MR = 'max-results',
		SI = 'start-index',
		OB = 'orderby'

	useSP(
		url,
		MR,
		numClamp({
			num: conf[MR],
			...OK_MAXRES,
		}) + '',
	)

	useSP(url, OB, !OK_ORDERBY.has(conf[OB]) ? 'published' : conf[OB])

	useSP(
		url,
		SI,
		numClamp({
			num: conf[SI],
			min: 1,
			def: 1,
		}) + '',
	)
}
