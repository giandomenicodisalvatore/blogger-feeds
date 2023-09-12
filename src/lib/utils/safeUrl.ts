import { type UrlLike } from '@lib'

export const safeUrl = (url: UrlLike, base?: UrlLike) => {
	try {
		url = new URL(decodeURIComponent(url + ''), base)
		return url
	} catch {
		return null
	}
}
