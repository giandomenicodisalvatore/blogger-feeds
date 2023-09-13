import {
	extractLink,
	extractIds,
	isoDateStr,
	BFytimg,
	BFthumb,
	BFmake,
} from '@lib'

export type BFPost = {
	id: string
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

export const PostSchema = new Map()
	.set('id', (raw: any) => extractIds(raw?.id?.$t)?.post)
	.set('title', (raw: any) => raw?.title?.$t)
	.set('self', (raw: any, meta: any) => {
		if (meta.post) return meta.self
		return BFmake(meta.blog)?.postId(PostSchema.get('id')(raw))?.toString()
	})
	.set('href', (raw: any, meta: any) => {
		if (meta.post) return meta.href
		return extractLink(raw?.link, 'alternate')
	})
	.set('etag', (raw: any) => raw?.gd$etag)
	.set('authors', (raw: any) => raw?.author?.map((a: any) => a?.name?.$t) ?? [])
	.set('published', (raw: any) => isoDateStr(raw?.published?.$t))
	.set('updated', (raw: any) => isoDateStr(raw?.updated?.$t))
	.set('image', (raw: any) => BFytimg(BFthumb(raw?.media$thumbnail?.url)))
	.set('type', (raw: any) => raw?.content?.type)
	.set('body', (raw: any) => raw?.content?.$t)
	.set('categories', (raw: any) => {
		return raw?.category?.map((cat: any) => cat?.term) ?? []
	})
