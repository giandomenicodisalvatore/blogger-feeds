/**
 * Set or delete search params
 * * deletes key on empty string ""
 */
export const useSP = (url: URL, key?: string, val?: string) => {
	const $ = url.searchParams
	if (key) (val ??= '') ? $.set(key, val + '') : $.delete(key)
	return $
}
