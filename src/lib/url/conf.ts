import {
	type PagedConf,
	destrBlogIds,
	destrQ,
	BFbuild,
	safeUrl,
} from '@lib/url'

export type DestrConf = Partial<
	{
		blog: URL | string
		blogId: string
		postId: string
	} & PagedConf
>

/**
 * Inverse of builder, creates blogger url configs
 * * doesn't validate, just coerces to conf shape
 */
export const BFconf = (str: URL | string) => {
	const conf: DestrConf = {}

	// may not be a valid url, just parse it
	// parse params for blog, blogId and postId
	Object.assign(conf, destrBlogIds(str ?? ''))

	if ((str = safeUrl(str) as URL)) {
		// other params are already handled by bfbuild
		// let's exploit its validation mechanisms
		Object.assign(conf, Object.fromEntries(str.searchParams))

		// @ts-expect-error: merged search param may be there...
		if (typeof conf?.q === 'string') Object.assign(conf, destrQ(conf.q))
		// will be erased by builder validation
	}

	return conf
}

/**
 * Merges two urls or configs together
 */
export const BFrebuild = (
	url: URL | string | DestrConf,
	conf: URL | string | DestrConf,
) => {
	try {
		const merged = {}

		for (let par of [url, conf])
			Object.assign(
				merged,
				par instanceof URL || typeof par === 'string' ? BFconf(par) : par,
			)

		return BFbuild(merged as any)
	} catch (e) {
		return console.error(e, url, conf), null
	}
}
