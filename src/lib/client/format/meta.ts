import { extractLink, extractIds, isoDateStr, BFmake, safeUrl } from '@lib'

export type BFPostMeta = {
	blog: string
	blogId: string
	post: string
	updated: string
	total: null
	'start-index'?: null
	'max-results'?: null
	self: string
	href: string
	next: null
}

export type BFPaginatedMeta = {
	blog: string
	blogId: string
	post: null
	updated: string
	total: number | null
	'start-index': number
	'max-results': number
	self: string
	href: null
	next: string | null
}

export const MetaSchema = new Map()
	.set('blog', (raw: any) => {
		return safeUrl(extractLink(raw?.link, 'alternate'))?.origin
	})
	.set('blogId', (raw: any) => extractIds(raw?.id?.$t)?.blog)
	// meta.post is set only on single post flow
	.set('post', (raw: any) => extractIds(raw?.id?.$t)?.post)
	.set('updated', (raw: any) => isoDateStr(raw?.updated?.$t))
	.set('total', (raw: any) => Number(raw?.openSearch$totalResults?.$t))
	.set('start-index', (raw: any) => Number(raw?.openSearch$startIndex?.$t))
	.set('max-results', (raw: any) => Number(raw?.openSearch$itemsPerPage?.$t))
	.set('self', (raw: any, meta: any) => {
		const paginated = safeUrl(extractLink(raw?.link, 'self'))
		return BFmake(paginated ? '?' + paginated?.search : '', meta.blog)
			?.postId(meta.post)
			?.toString()
	})
	.set('href', (raw: any, meta: any) => {
		return meta.post && safeUrl(extractLink(raw?.link, 'alternate'))?.toString()
	})
	.set('next', (raw: any, meta: any) => {
		const next = safeUrl(extractLink(raw?.link, 'next'))
		return next && BFmake('?' + next.search, meta.blog)?.toString()
	})
