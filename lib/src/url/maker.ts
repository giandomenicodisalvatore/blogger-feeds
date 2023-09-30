import { BLOGGER, normURL } from '@lib/url'
import {
	type SingleConf,
	type PagedConf,
	type BlogConf,
	blog,
	single,
	paged,
	dates,
	search,
	cleanup,
	// to avoid circular references
	// must import @lib/url/mutators
} from '@lib/url/mutators'

/**
 * Configuration object
 */
export type BuildConf = BlogConf & SingleConf & PagedConf

/**
 * An in-place url mutator
 * * returns true for final url
 */
export type BuildMutator = (url: URL, conf: BuildConf) => void | boolean

/**
 * Mutate urls in-place while validating conf
 * * return true to immediately stop processing
 */
const Mutators = [blog, single, paged, dates, search, cleanup]

/**
 * Url builder, creates blogger urls
 */
export const make = (conf: BuildConf) => {
	try {
		// always start by blog
		const url = new URL(conf.blog === 'blogger' ? BLOGGER : conf.blog)
		// mutate in-place, return when true
		for (const mutate of Mutators) if (mutate(url, conf)) break
		// consistent via many normURL passes
		return normURL(url)
	} catch (e) {
		return console.error(e, conf), null
	}
}
