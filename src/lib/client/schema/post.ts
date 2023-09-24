import { type SchemaParser, BFthumb, BFytimg, extractLink } from '@lib/client'
import { BFconf, BFdate, BFrebuild } from '@lib/url'

export type Post = {
	postId: string
	title: string
	self: string
	href: string
	authors: string[]
	published: string
	updated: string
	etag: string
	image: string | null
	type: string
	body: string
	categories: string[]
}

/**
 * Mostly remapping to post entry
 * * reuses meta data in single flow, since it's already calculated
 */
export const PostSchema = new Map<keyof Post, SchemaParser>()
	.set('postId', (raw, meta) => meta?.postId || BFconf(raw?.id?.$t)?.postId)
	.set('title', (raw, meta) => raw?.title?.$t)
	// in paged flow it points to start-index, so it must be recalculated
	// start-index won't be kept ecause it's unavailable in single flow
	.set(
		'self',
		(raw, meta) =>
			(meta?.postId && meta?.self) ||
			BFrebuild(extractLink(raw, 'self'), { blog: meta.blog }) + '',
	)
	.set('href', (raw, meta) =>
		meta.postId ? meta.href : extractLink(raw, 'alternate'),
	)
	// @ts-ignore: at least one is always there
	.set('authors', raw => raw?.author?.map(a => a?.name?.$t) ?? [])
	.set('published', raw => BFdate(raw?.published?.$t))
	.set('updated', raw => BFdate(raw?.updated?.$t))
	.set('etag', raw => raw?.gd$etag)
	.set('image', raw => BFytimg(BFthumb(raw?.media$thumbnail?.url)))
	.set('type', raw => raw?.content?.type)
	.set('body', raw => raw?.content?.$t)
	// @ts-ignore: they are remapped like this, if present
	.set('categories', raw => raw?.category?.map(cat => cat?.term) ?? [])
