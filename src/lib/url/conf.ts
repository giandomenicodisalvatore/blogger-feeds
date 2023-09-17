import { type BuildConf, isBlogger, matchIds, safeUrl, destrQ } from '@lib/url'

export type DestrConf = Partial<BuildConf>

/**
 * Inverse of builder, creates blogger url configs
 * * doesn't validate, just coerces to conf shape
 */
export const BFconf = (str: any) => {
	const matches = matchIds((str = safeUrl(str) ?? '')),
		conf: DestrConf = {}

	if (str instanceof URL) {
		// blog, can't be inferred without matching
		conf.blog = isBlogger(str) ? 'blogger' : new URL(str.origin)
		// same for blogId & postId
		if (matches)
			// blogger => /feeds/BLOG_ID/default/posts/POST_ID
			// custom domain => /feeds/default/posts/POST_ID
			for (const id of matches)
				if (conf.blog === 'blogger' && !conf.blogId)
					// first of 2 matches is always blogId
					conf.blogId = id
				// otherwise it's postId
				else conf.postId = id

		// other params are already handled by bfbuild
		// let's exploit its validation mechanisms
		Object.assign(conf, Object.fromEntries(str.searchParams))

		// @ts-expect-error: we know the search it's there
		if (typeof conf?.q === 'string') Object.assign(conf, destrQ(conf.q))
	}

	return conf
}
