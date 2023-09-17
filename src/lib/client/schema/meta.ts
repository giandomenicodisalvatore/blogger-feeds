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

export const MetaSchema: Map<keyof PagedMeta, SchemaParser> = new Map()

/*/
import { BFparse, safeUrl } from '@lib'

export type PostMeta = {
	blog: string
	'blog-id': string
	post: string
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
	'blog-id': string
	post: null
	updated: string
	etag: string
	total: number | null
	'start-index': number
	'max-results': number
	self: string
	href: null
	next: string | null
}

export type MetaParser = (raw: any, meta: Partial<PostMeta & PagedMeta>) => any

export const extractLink = (raw: any, link: string) =>
	safeUrl(raw?.link?.find(({ rel }: any) => rel === link)?.href)

// uber-tolerant => blogspot may change anytime
export const MetaSchema: Map<string, MetaParser> = new Map()
	// always required
	.set('blog', (raw: any, meta: any) => extractLink(raw, 'alternate')?.origin)
	.set('blogId', (raw: any) => BFparse(raw?.id?.$t)?.blogId)
	.set('postId', (raw: any) => BFparse(raw?.id?.$t)?.postId)
	// all the rest
	.set('updated', (raw: any) => isoDateStr(raw?.updated?.$t))
	.set('etag', (raw: any) => raw?.gd$etag)
	.set('total', (raw: any) => Number(raw?.openSearch$totalResults?.$t))
	.set('start-index', (raw: any) => Number(raw?.openSearch$startIndex?.$t))
	.set('max-results', (raw: any) => Number(raw?.openSearch$itemsPerPage?.$t))
	// avoid BFUrl extra cycles by reusing blogspot links
	.set('self', (raw: any, meta: any) => {
		const url = extractLink(raw, 'self')
		return bloggerAdapter(url, meta)?.href
	})
	.set('href', (raw: any, meta: any) => {
		// only for posts
		return meta.post && extractLink(raw, 'alternate')?.href
	})
	.set('next', (raw: any, meta: any) => {
		const next = extractLink(raw, 'next')
		// only for paginated
		return bloggerAdapter(next, meta)?.href
	})
/*/
