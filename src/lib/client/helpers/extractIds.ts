export const extractIds = (
	rawId: string,
): {
	blog?: string
	post?: string
} => {
	const extracted = (rawId + '')
		?.match(/(blog|post)\-\d+/g)
		?.map(e => e.split('-'))
	return Object.fromEntries(extracted ?? [])
}
