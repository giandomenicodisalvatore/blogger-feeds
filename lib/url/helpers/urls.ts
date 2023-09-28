/**
 * Normalize url
 * * decode characters
 * * sort params
 */
export const normURL = (url: URL) => (
	(url.href = decodeURIComponent(url.href)), url.searchParams.sort(), url
)

/**
 * Create url without errors
 * * returns null on invalid
 */
export const safeUrl = (url: URL | string, base?: URL | string) => {
	try {
		return new URL(url, base)
	} catch {
		return null
	}
}
