type ExtractedIds = {
	blog?: string
	post?: string
}

export const extractIds = (rawId: string): ExtractedIds =>
	Object.fromEntries(
		rawId.match(/(blog|post)\-\d+/g)?.map(e => e.split('-')) ?? [],
	)
