import {
	type BFSchema,
	bloggerAdapter,
	extractLink,
	isoDateStr,
	BFYTimg,
	BFThumb,
	BFGetId,
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

export const PostSchema: BFSchema = new Map()
	.set('id', (raw: any) => BFGetId(raw?.id?.$t)?.post)
	.set('title', (raw: any) => raw?.title?.$t)
	.set('self', (raw: any, meta: any) => {
		if (meta.post) return meta.self // @ts-ignore
		const post = PostSchema.get('id')(raw)
		return bloggerAdapter(extractLink(raw, 'self'), { ...meta, post })?.href
	})
	.set('href', (raw: any, meta: any) =>
		meta.post ? meta.href : extractLink(raw, 'alternate')?.href,
	)
	.set('authors', (raw: any) => raw?.author?.map((a: any) => a?.name?.$t) ?? [])
	.set('published', (raw: any) => isoDateStr(raw?.published?.$t))
	.set('updated', (raw: any) => isoDateStr(raw?.updated?.$t))
	.set('etag', (raw: any) => raw?.gd$etag)
	.set('image', (raw: any) => BFYTimg(BFThumb(raw?.media$thumbnail?.url)))
	.set('type', (raw: any) => raw?.content?.type)
	.set('body', (raw: any) => raw?.content?.$t)
	.set('categories', (raw: any) => {
		return raw?.category?.map((cat: any) => cat?.term) ?? []
	})
