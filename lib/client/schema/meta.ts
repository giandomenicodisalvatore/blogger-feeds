import { toConf, isoDate, merge, safeUrl } from '@lib/url'

export type SingleMeta = {
	blog: string
	blogId: string
	postId: string
	updated: string
	etag: string
	total: null
	'start-index': null
	'max-results': null
	self: string
	href: string
	next: null
}

export type PagedMeta = {
	blog: string
	blogId: string
	postId: string
	updated: string
	etag: string
	total: number | null
	'start-index': number | null
	'max-results': number
	self: string
	href: string
	next: string | null
}

export type SchemaParser = (raw: any, meta: PagedMeta | SingleMeta) => any

export const extractLink = (raw: any, link: string): string =>
	raw?.link?.find(({ rel }: any) => rel === link)?.href ?? ''

/**
 * Maps each result data prop to its own schemaParser
 * * must be fail-safe because blogger may change anytime
 * * extracts the most important flags from feeds:
 * 	- blog, holds the only reference to the custom domain
 * 	- blogId, flag required by blog flows
 * 	- postId, flag required by single / paged flows
 * 	- next, flag and url to next paged posts group
 */
export const MetaSchema = new Map<
	keyof PagedMeta | keyof SingleMeta,
	SchemaParser
>()
	/**
	 * Always required
	 */
	// inferred from link 'alternate' because it references custom domains
	.set('blog', raw => safeUrl(extractLink(raw, 'alternate'))?.origin)
	// blogId and postId should be inferred from 'raw?.id?.$t' for accuracy
	// but we use toConf since it handles every use case and self link is
	// guaranteed to be present on every resource
	.set('blogId', raw => toConf(extractLink(raw, 'self')).blogId)
	.set('postId', raw => toConf(extractLink(raw, 'self')).postId)
	/**
	 * All the rest is optional
	 * * mostly are just remapped to post entries
	 */
	// dates params
	.set('updated', raw => isoDate(raw?.updated?.$t))
	.set('etag', raw => raw?.gd$etag)
	// paged params
	.set('total', raw => Number(raw?.openSearch$totalResults?.$t))
	.set('start-index', raw => Number(raw?.openSearch$startIndex?.$t))
	.set('max-results', raw => Number(raw?.openSearch$itemsPerPage?.$t))
	// links
	// reuses make and rebuild to enforce conventions
	// since blogspot urls may omit certain parameters
	// busting local cache when calling the same resource
	.set('self', (raw, meta) => merge(extractLink(raw, 'self'), meta as any) + '')
	// blogger permalink to single posts
	.set('href', (raw, meta) => meta.postId && extractLink(raw, 'alternate'))
	// paged resuts have a next url, already configured
	// and only if there are still entries yet to fetch
	// this is a very valid flag for consecutive requests
	// must invalidate for single posts
	.set(
		'next',
		(raw, meta) =>
			!meta.postId &&
			(raw = extractLink(raw, 'next')) &&
			merge(raw, meta.blog) + '',
	)
