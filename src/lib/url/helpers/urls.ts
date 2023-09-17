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
		url = new URL(url, base)
		return normURL(url)
	} catch {
		return null
	}
}
