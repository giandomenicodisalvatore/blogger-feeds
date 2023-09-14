import {
	type BFPaginatedMeta,
	type BFPostMeta,
	type BFSchema,
	type BFPost,
	MetaSchema,
	PostSchema,
} from '@lib'

export type BFData =
	| { meta: BFPostMeta; data: [BFPost] }
	| { meta: BFPaginatedMeta; data: BFPost[] }

export type BFProps =
	| keyof BFPaginatedMeta
	| keyof BFPostMeta
	| keyof BFPost
	| '*'

export type BFPick = '*' | BFProps[]

// everything depends on these props
const REQ_PROPS: BFProps[] = ['blog', 'blog-id', 'post']

type BFConsume = { schema: BFSchema; choice: Set<string>; raw: any; meta?: any }
const feedConsumer = function* ({ schema, choice, raw, meta }: BFConsume) {
	// reuse same logics if post or meta
	if (!Array.isArray(raw)) raw = [raw]

	while (raw?.length) {
		const final: any = {},
			curr = raw.shift()

		for (const [key, fn] of schema)
			if (choice.has('*') || choice.has(key))
				// if no meta, post ? reuse post : outer feed data
				final[key] = fn(curr, (meta ??= final)) || null

		yield final
	}
}

export const BFParse = (
	{ feed, entry }: Record<string, any> = {},
	pick: BFPick = '*', // all props
): BFData => {
	// normalize and fallback chosen props
	const choice = Array.isArray(pick)
			? new Set(pick.concat(REQ_PROPS))
			: new Set('*'),
		// flow detection: post ? string : null
		meta = feedConsumer({
			raw: feed || entry,
			schema: MetaSchema,
			choice,
		}).next().value,
		// lazy formatting reusing meta
		data = [
			...feedConsumer({
				raw: feed?.entry || entry,
				schema: PostSchema,
				choice,
				meta,
			}),
		]
	// same api for single and paginated
	return { meta, data }
}
