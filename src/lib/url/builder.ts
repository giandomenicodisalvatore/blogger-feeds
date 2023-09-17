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
} from '@lib/url/mutators'
import { BLOGGER } from '@lib/url'

/**
 * Configuration object
 */
export type BuildConf = BlogConf & SingleConf & PagedConf

/**
 * An in-place url mutator
 * * returns true for final url
 */
export type BuildMutator = (url: URL, conf: BuildConf) => void | boolean

const Mutators = [blog, single, paged, dates, search, cleanup]

/**
 * Url builder, creates blogger urls
 */
export const BFbuild = (conf: BuildConf) => {
	try {
		// always start by blog
		const url = new URL(conf.blog === 'blogger' ? BLOGGER : conf.blog)
		// mutate in-place, return when true
		for (const mutate of Mutators) if (mutate(url, conf)) break
		// consistent via many normURL passes
		return url
		// uber-tolerant
	} catch (e) {
		return console.error(e, conf), null
	}
}
