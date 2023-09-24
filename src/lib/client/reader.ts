import {
	type SchemaParser,
	type SingleMeta,
	type PagedMeta,
	type Post,
	MetaSchema,
	PostSchema,
} from '@lib/client'

export type Pick = '*' | keyof PagedMeta | keyof SingleMeta | keyof Post

export type Feed =
	| {
			meta: Partial<SingleMeta>
			data: [Partial<Post>]
	  }
	| {
			meta: Partial<PagedMeta>
			data: Partial<Post>[]
	  }

export type ReadConf = {
	pick?: '*' | Pick[]
}

const feedConsumer = function* ({
	raw,
	meta,
	schema,
	choice,
}: {
	schema: Map<Pick, SchemaParser>
	choice: Set<Pick>
	meta?: PagedMeta | SingleMeta
	raw: any[]
}): Generator {
	// adapter is necessary to reuse logics
	// this way function becomes flow-agnostic
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

export const BFread = (raw: any, conf: ReadConf) => {
	// when in doubt, keeps everything
	const choice: Set<Pick> = new Set(
			Array.isArray(conf.pick) ? conf.pick : ['*'],
		),
		meta = feedConsumer({
			// reuse logics for both schema and post
			raw: raw?.feed || raw?.entry,
			schema: MetaSchema,
			choice,
		}).next().value,
		data = [
			...feedConsumer({
				// same applies here
				raw: raw?.feed?.entry || raw?.entry,
				schema: PostSchema,
				choice,
				meta,
			}),
		]
	return {
		meta,
		data,
	} as Feed
}
