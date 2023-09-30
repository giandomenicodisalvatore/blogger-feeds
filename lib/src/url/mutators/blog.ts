import {
	type BuildMutator,
	REQ_PATH,
	REQ_PARS,
	isBlogger,
	matchIds,
	useHF,
} from '@lib/url'

export type BlogConf =
	| {
			blog: URL
	  }
	| {
			blog: 'blogger'
			blogId: string
	  }

/**
 * Ensures url structure compatibility
 * * applies shared configs to all flows
 */
export const blog: BuildMutator = (url, conf) => {
	// default path
	let path = REQ_PATH

	//blogger adapter
	if (isBlogger(url)) conf.blog = 'blogger'
	if (conf?.blog === 'blogger')
		if (!matchIds(conf?.blogId + '')) throw new Error('invalid conf.blogID')
		else path = REQ_PATH.replace('feeds', 'feeds/' + conf.blogId)

	// enforce requirements
	useHF(url, 'path', path)
	useHF(url, 'search', REQ_PARS + '')
}
