import {
	type BFPaginatedMeta,
	type BFPostMeta,
	type BFPost,
	MetaSchema,
	PostSchema,
} from '@lib'

// everything depends on these props
const REQ_PROPS: BFprops[] = ['blog', 'post']

const consumeFn = ({
	schema,
	choice,
	raw,
	meta,
}: {
	schema: typeof MetaSchema | typeof PostSchema
	choice: Set<BFprops>
	raw: any
	meta?: any
}) => {
	const final: any = {}

	for (const [key, fn] of schema)
		if (choice.has('*') || choice.has(key))
			final[key] = fn(raw, meta || final) || null

	return final
}

const normalizeChoice = (pick: BFpick) => {
	pick = Array.isArray(pick)
		? (pick.length && pick.concat(REQ_PROPS)) || []
		: ['*']
	return new Set(pick)
}

export const BFformat = (
	{ feed, entry }: Record<string, any> = {},
	pick: BFpick = '*',
) => {
	const data: BFPost[] = [],
		choice = normalizeChoice(pick),
		meta = consumeFn({
			// flow detection
			schema: MetaSchema,
			raw: feed ?? entry,
			choice,
		})

	if (meta.post) feed = { entry: [entry] }

	while (feed?.entry?.length) {
		const post = consumeFn({
			schema: PostSchema,
			raw: feed.entry.shift(),
			choice,
			meta,
		})
		data.push(post)
	}

	return meta.post // enforce types
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

export type BFpick = '*' | BFprops[]

export type BFprops =
	| keyof BFPaginatedMeta
	| keyof BFPostMeta
	| keyof BFPost
	| '*'
