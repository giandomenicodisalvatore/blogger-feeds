import {
	type BFPaginatedMeta,
	type BFPostMeta,
	type BFPost,
	MetaSchema,
	PostSchema,
} from '@lib'

const formatterFn = (
	schema: typeof MetaSchema | typeof PostSchema,
	raw: any,
	meta?: any,
) => {
	const formatted: any = {}

	for (const [key, fn] of schema)
		formatted[key] = fn(raw, meta || formatted) || null

	return formatted
}

export const BFformat = ({ feed, entry }: any) => {
	const meta = formatterFn(MetaSchema, feed || entry),
		data: any[] = []

	while ((feed ??= { entry: [entry] })?.entry?.length)
		data.push(formatterFn(PostSchema, feed.entry.shift(), meta))

	return meta.post
		? ({
				data: data.at(0),
				meta,
		  } as BFPostData)
		: ({
				data,
				meta,
		  } as BFPaginatedData)
}

export type BFPostData = {
	meta: BFPostMeta
	data: BFPost
}

export type BFPaginatedData = {
	meta: BFPaginatedMeta
	data: BFPost[]
}
