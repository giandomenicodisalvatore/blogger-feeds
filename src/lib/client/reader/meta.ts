import { isoDateStr, BFGetId, extractLink, bloggerAdapter } from '@lib'

export type BFPostMeta = {
	blog: string
	'blog-id': string
	post: string
	updated: string
	etag: string
	total: null
	'start-index'?: null
	'max-results'?: null
	self: string
	href: string
	next: null
}

export type BFPaginatedMeta = {
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

// schema is a Map because of iterability, lookup speed an order consistency
export type BFSchema = Map<string, (raw: any, meta: any) => any>

// blogspot may change anytime, it should be VERY fault tolerant!
export const MetaSchema: BFSchema = new Map()
	// always required
	.set('blog', (raw: any) => extractLink(raw, 'alternate')?.origin)
	.set('blog-id', (raw: any) => BFGetId(raw?.id?.$t)?.blog)
	.set('post', (raw: any) => BFGetId(raw?.id?.$t)?.post)
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
