import { type DestrConf, matchIds, isBlogger, safeUrl } from '@lib/url'

export const destrBlogIds = (str: URL | string) => {
	const conf: DestrConf = {},
		matches = matchIds(str)

	// blog, can't be inferred without matching
	conf.blog = isBlogger((str = safeUrl(str)?.origin ?? '')) ? 'blogger' : str

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

	return conf
}
