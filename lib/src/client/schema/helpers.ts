import { safeUrl, useSP } from '@lib/url'

const BFimg =
	/(http.*(?:blogger|blogspot|googleusercontent).*)(?:(\/.*\/)(.*\..*$)|(=s\d+.+?$))/
// if blogspot, group with following path
// keep filename and last segment that represents size
// if "=s" and digits, that's noname notation

export const thumb = (url: URL | string, size: number = 0) => {
	const matched = (url = url + '').match(new RegExp(BFimg)),
		// when in doubt, s0 opts for original image
		noname = matched?.at(4)

	if (matched)
		url = noname // replace according to format (noname or filename)
			? url.replace(noname ?? '', `=s${size}`) // =s0$ noname
			: url.replace(new RegExp(BFimg), `$1/s${size}/$3`) // **/s0/filename$

	return url
}

// refactored to detect youtube video id based on url format
// will only output hqdefault because it is the most consistent format
// otherwise there is no strict rule for image formatting in youtube
// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
export const ytimg = (str: string | URL) => {
	let url = safeUrl(str),
		vid

	if (!url) return str

	// it is already a well formatted image, just port to default
	if (
		url.href.includes('img.youtube.com/vi/') ||
		url.href.includes('ytimg.com/vi/')
	)
		vid = url.pathname.substring(4).replace(/\/.+?$/, '')

	// get the video id properly
	if (url.href.includes('youtube.com/watch')) vid = url.searchParams.get('v')

	// when passed a short-link
	if (url.href.includes('youtu.be'))
		vid = url.pathname.substring(1).replace(/\?.+?$/, '')

	// if there is no url, just leave it
	return vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : str
}
