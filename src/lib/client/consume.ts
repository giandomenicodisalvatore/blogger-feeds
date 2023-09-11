import {
	extractAuthor,
	extractLink,
	extractIds,
	isoDateStr,
	urlAdapter,
	bloggerThumb,
	youtubeHQThumb,
} from '@lib'
import { wMemo } from 'weaken-it'

const MetaSchema = new Map()
	.set('blog', (raw: any) => extractLink(raw?.link, 'alternate'))
	.set('blogId', (raw: any) => extractIds(raw?.id?.$t)?.blog)
	.set('updated', (raw: any) => isoDateStr(raw?.updated?.$t))
	.set('totalItems', (raw: any) => Number(raw?.openSearch$totalResults?.$t))
	.set('startIndex', (raw: any) => Number(raw?.openSearch$startIndex?.$t))
	.set('maxResults', (raw: any) => Number(raw?.openSearch$itemsPerPage?.$t))
	.set('self', (raw: any, meta: any) => {
		return (raw = extractLink(raw?.link, 'self')) && urlAdapter(raw, meta)
	})
	.set('next', (raw: any, meta: any) => {
		return (raw = extractLink(raw?.link, 'next')) && urlAdapter(raw, meta)
	})

const PostSchema = new Map()
	.set('id', (raw: any) => extractIds(raw?.id?.$t)?.post)
	.set('title', (raw: any) => raw?.title?.$t)
	.set('published', (raw: any) => isoDateStr(raw?.published?.$t))
	.set('updated', (raw: any) => isoDateStr(raw?.updated?.$t))
	.set('authors', (raw: any) => raw?.author?.map(wMemo(extractAuthor)))
	.set('image', (raw: any) =>
		youtubeHQThumb(bloggerThumb(raw?.media$thumbnail?.url)),
	)
	.set('content', (raw: any) => raw?.content?.type)
	.set('body', (raw: any) => raw?.content?.$t)

	// TODO
	.set('category', (raw: any) => raw?.category)
	.set('link', (raw: any) => raw?.link)

export const consumeFeed = ({ feed }: any) => {
	const meta: Record<string, any> = {},
		data: any[] = []

	MetaSchema.forEach((transformer, key) => {
		meta[key] = transformer(feed, meta)
	})

	while (feed.entry.length) {
		const post: Record<string, any> = {}

		PostSchema.forEach((transformer, key) => {
			post[key] = transformer(feed.entry.shift())
		})

		data.push(post)
	}

	return {
		meta,
		data,
	}
}

/*/
[
	// "gd$etag",
	// "id",
	// "published",
	// "updated",
	// "app$edited",
	"category",
	// "title",
	// "content",
	"link",
	// "author",
	// "media$thumbnail"
]
/*/
