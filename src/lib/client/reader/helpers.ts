import {
	type BFPaginatedMeta,
	type BFPostMeta,
	type UrlStr,
	isBlogspot,
	safeUrl,
	REQ_PATH,
	REQ_PARAMS,
} from '@lib'

export const extractLink = (raw: any, link: string) =>
	safeUrl(raw?.link?.find(({ rel }: any) => rel === link)?.href)

export const bloggerAdapter = (
	url: URL | null,
	meta: BFPostMeta | BFPaginatedMeta,
) => {
	if (!url || isBlogspot(meta.blog)) return url

	url.href = url.href
		.replace(url.origin, meta.blog)
		.replace(`/${meta['blog-id']}/`, '/')

	if (meta.post && url.pathname.includes(meta.post)) {
		url.pathname = REQ_PATH + meta.post
		url.search = REQ_PARAMS + ''
	}

	return url
}

const BFimg =
	/(http.*(?:blogger|blogspot|googleusercontent).*)(?:(\/.*\/)(.*\..*$)|(=s\d+.+?$))/
// if blogspot, group with following path
// keep filename and last segment that represents size
// if "=s" and digits, that's noname notation

export const BFThumb = (url: UrlStr, size: number = 0) => {
	// when in doubt, s0 opts for original image

	const matched = (url = url + '').match(new RegExp(BFimg)),
		noname = matched?.at(4)

	if (matched)
		url = noname // replace according to format (noname or filename)
			? url.replace(noname ?? '', `=s${size}`) // =s0$ noname
			: url.replace(new RegExp(BFimg), `$1/s${size}/$3`) // **/s0/filename$

	return url
}

const YTimg = /(.+?(?:\.?ytimg|\.?youtube)\.com\/vi\/.*\/).+?(\..+?$)/
// if youtube, group everything
// save last segment as extension

// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
export const BFYTimg = (url: UrlStr) =>
	new RegExp(YTimg).test((url = url + '')) // replace the filename
		? url.replace(new RegExp(YTimg), '$1hqdefault$2')
		: url
