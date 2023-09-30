import { type SchemaParser, thumb, ytimg, extractLink } from '@lib/client'
import { toConf, isoDate, merge } from '@lib/url'

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
 * Maps each result data prop to its own schemaParser
 * * must be fail-safe because blogger may change anytime
 * * reuses meta data in single flow, since it's already calculated
 */
export const PostSchema = new Map<keyof Post, SchemaParser>()
	// in paged this is the only reliable way to get the id
	// because link 'self' refers to item start-index
	.set('postId', (raw, meta) => meta?.postId || toConf(raw?.id?.$t)?.postId)
	.set('title', raw => raw?.title?.$t)
	// in paged flow it points to start-index, so it must be recalculated
	// start-index won't be kept ecause it's unavailable in single flow
	.set(
		'self',
		(raw, meta) =>
			(meta?.postId && meta?.self) ||
			merge(extractLink(raw, 'self'), { blog: meta.blog }) + '',
	)
	// this is the blogspot permalink
	.set('href', (raw, meta) =>
		meta.postId ? meta.href : extractLink(raw, 'alternate'),
	)
	// @ts-ignore: at least one is always there
	.set('authors', raw => raw?.author?.map(a => a?.name?.$t) ?? [])
	.set('published', raw => isoDate(raw?.published?.$t))
	.set('updated', raw => isoDate(raw?.updated?.$t))
	.set('etag', raw => raw?.gd$etag)
	.set('image', raw => ytimg(thumb(raw?.media$thumbnail?.url)))
	.set('type', raw => raw?.content?.type)
	.set('body', raw => raw?.content?.$t)
	// @ts-ignore: they are remapped like this, if present
	.set('categories', raw => raw?.category?.map(cat => cat?.term) ?? [])
