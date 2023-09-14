import { BFUrl } from '@lib'

export const safeUrl = (url: any, base?: any): URL | null => {
	try {
		url = new URL(decodeURIComponent(url + ''), base)
		url.searchParams.sort() // consistency
		return url
	} catch {
		return null
	}
}

export const BFBuild = (conf: any, blog?: any) => {
	let url = safeUrl(conf?.blog || conf + '', blog)
	if (!url) return null // not buildable

	// valid config object or url params
	url = new BFUrl(conf?.blog || conf, blog)
	if (conf?.blog) Object.assign(url, conf)
	return url as BFUrl
}
