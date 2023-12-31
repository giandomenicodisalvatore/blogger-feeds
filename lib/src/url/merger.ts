import {
	type PagedConf,
	type BuildConf,
	getIds,
	splitSearch,
	make,
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
 * Inverse of make, creates blogger url configs
 * * doesn't validate, just coerces to conf shape
 */
export const toConf = (str: URL | string) => {
	const conf: DestrConf = {}

	// may not be a valid url, just parse it
	// parse params for blog, blogId and postId
	Object.assign(conf, getIds(str ?? ''))

	if ((str = safeUrl(str) as URL)) {
		// other params are already handled by make
		// let's exploit its validation mechanisms
		Object.assign(conf, Object.fromEntries(str.searchParams))

		// @ts-expect-error: merged search param may be there...
		if (typeof conf?.q === 'string') Object.assign(conf, splitSearch(conf.q))
		// will be erased by make validation
	}

	return conf
}

/**
 * Merges two urls or configs together
 */
export const merge = (...conf: (URL | string | DestrConf)[]) => {
	try {
		const merged = {} as BuildConf

		for (let par of conf) {
			if (par instanceof URL || typeof par === 'string') par = toConf(par)
			Object.assign(merged, par)
		}

		return make(merged)
	} catch (e) {
		console.error(e, ...conf)
		return null
	}
}
