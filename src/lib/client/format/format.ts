import {
	type BFPaginatedMeta,
	type BFPostMeta,
	type BFPost,
	MetaSchema,
	PostSchema,
} from '@lib'

const consumeFn = (
	schema: typeof MetaSchema | typeof PostSchema,
	choice: Set<BFpick>,
	raw: any,
	meta?: any,
) => {
	const final: any = {}

	for (const [key, fn] of schema)
		if (choice.has('*') || choice.has(key))
			// if chosen, save data or default
			final[key] = fn(raw, meta || final) || null

	return final
}

export const BFformat = ({ feed, entry }: any, pick: BFpick[] = ['*']) => {
	const choice = new Set(
			Array.isArray(pick) // only select when array
				? pick.concat('blog', 'post') // required
				: ['*'], // keeps all by default
		) as Set<BFpick>,
		// feed if paginated or default to entry when post
		meta = consumeFn(MetaSchema, choice, feed || entry),
		data: BFPost[] = []

	// reuse for single post && consume once
	feed ??= { entry: [entry] }

	// use original as a stack
	while (feed?.entry?.length) {
		// allocate memory for speed
		const raw = feed.entry.shift(),
			post = consumeFn(PostSchema, choice, raw, meta)
		data.push(post)
	}

	return meta.post // now we know it's a single post
		? ({ meta, data: data.at(0) } as BFPostData)
		: ({ meta, data } as BFPaginatedData)
}

export type BFPostData = {
	meta: BFPostMeta
	data: BFPost
}

export type BFPaginatedData = {
	meta: BFPaginatedMeta
	data: BFPost[]
}

export type BFpick =
	| keyof BFPaginatedMeta
	| keyof BFPostMeta
	| keyof BFPost
	| '*'
