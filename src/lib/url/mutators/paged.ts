import {
	type BuildMutator,
	type Ordering,
	OK_ORDERBY,
	OK_MAXRES,
	useSP,
	numClamp,
} from '@lib/url'

export interface PagedConf {
	'max-results'?: number
	'start-index'?: number
	orderby?: Ordering
}

export const paged: BuildMutator = (url, conf) => {
	// enforce explicitness and consistency

	// required
	conf['max-results'] = numClamp({
		num: conf['max-results'],
		...OK_MAXRES,
	})
	useSP(url, 'max-results', conf['max-results'] + '')

	// required
	conf['orderby'] = OK_ORDERBY.has(conf['orderby'])
		? conf['orderby']
		: 'published'
	useSP(url, 'orderby', conf['orderby'])

	// optional
	if (conf['start-index']) {
		conf['start-index'] = numClamp({
			num: conf['start-index'],
			min: 1,
			def: 1,
		})
		useSP(url, 'start-index', conf['start-index'] + '')
	}
}
