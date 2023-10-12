import {
	type SchemaParser,
	type SingleMeta,
	type PagedMeta,
	type Post,
	MetaSchema,
	PostSchema,
} from '@lib/client'

export type FeedKey = '*' | keyof PagedMeta | keyof SingleMeta | keyof Post

export type FeedData = (
	| {
			meta: Partial<SingleMeta>
			data: [Partial<Post>]
	  }
	| {
			meta: Partial<PagedMeta>
			data: Partial<Post>[]
	  }
) & {
	type: 'data'
}

export type ReadConf = {
	keep?: '*' | FeedKey[]
}

// the most important flags
// aways required for the rest of the params
const REQ_PROPS: FeedKey[] = ['blog', 'blogId', 'postId', 'next']

const feedConsumer = function* ({
	raw,
	meta,
	schema,
	choice,
}: {
	schema: Map<FeedKey, SchemaParser>
	choice: Set<FeedKey>
	meta?: PagedMeta | SingleMeta
	raw: any[]
}): Generator {
	// adapter to make the function flow-agnostic
	if (!Array.isArray(raw)) raw = [raw]

	while (raw.length) {
		const final: any = {},
			curr = raw.shift()

		for (const [key, fn] of schema)
			if (choice.has('*') || choice.has(key))
				// if no meta, post ? post : outer feed
				// reuse same post as meta fallback
				final[key] = fn(curr, (meta ??= final)) || null

		yield final
	}
}

export const reader = (raw: any, conf: ReadConf) => {
	// when in doubt, keeps everything
	const choice = new Set<FeedKey>(
			Array.isArray(conf.keep) ? conf.keep.concat(REQ_PROPS) : ['*'],
		),
		// reuse logics for paged and post
		// raw: paged vs single flow
		meta = feedConsumer({
			raw: raw?.feed || raw?.entry,
			schema: MetaSchema,
			choice,
		}).next().value,
		// same applies here
		// raw: paged vs single flow
		data = [
			...feedConsumer({
				raw: raw?.feed?.entry || raw?.entry,
				schema: PostSchema,
				choice,
				meta,
			}),
		]
	return {
		type: 'data',
		meta,
		data,
	} as FeedData
}
