import { safeUrl } from '@lib/url'

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

const ytPathIds = [
	'youtube-nocookie', // privacy embeds
	'img.youtube.com', // thumbnails
	'ytimg.com', // short thumbs
	'youtu.be', // share links
]

export const ytid = (url: string | URL) => {
	if ((url = safeUrl(url) ?? '') instanceof URL) {
		if (url.href.includes('youtube.com/watch'))
			return url.searchParams.get('v') ?? ''

		for (const test of ytPathIds)
			if (url.href.includes(test))
				return (
					url.pathname
						.split(/\/|\?/)
						?.filter(e => e !== 'embed' && e !== 'vi')
						?.at(1) ?? ''
				)
	}

	return ''
}

type YTquality = '' | 'mq' | 'hq' | 'sd' | 'maxres'

type YTthumb = 'default' | '1' | '2' | '3'

const YouTubeFixture = {
	origin: {
		norm: 'https://img.youtube.com', // default
		short: 'https://i.ytimg.com', // shortened
	},
	quality: new Set<YTquality>([
		'', // default
		'mq', // medium
		'hq', // guaranteed
		'sd', // standard
		'maxres', // unscaled
	]),
	thumbs: new Set<YTthumb>([
		'default', // video bg
		'1', // start
		'2', // middle
		'3', // end
	]),
}

// will prefer hqdefault because it is the most consistent format
// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
export const ytimg = (
	url: string | URL = '',
	{
		thumb = 'default',
		quality = 'hq',
		short = true,
		all = false,
		id,
	}: Partial<{
		short: boolean
		thumb: YTthumb
		quality: YTquality
		all: boolean
		id: string
	}> = {},
) => {
	// no valid yt ids, let the url go
	if (!(id ??= ytid(url))) return url

	// init with defaults and validate properly
	const origin = YouTubeFixture.origin[short ? 'short' : 'norm']
	if (!YouTubeFixture.quality.has(quality)) quality = 'hq'
	if (!YouTubeFixture.thumbs.has(thumb)) thumb = 'default'

	// guaranteed default thumbnail size
	if (!all) return origin + '/vi/' + id + '/' + quality + thumb + '.jpg'

	// returns all possibilities
	const final: any = {}
	for (const thumb of YouTubeFixture.thumbs)
		for (const quality of YouTubeFixture.quality)
			(final[thumb] ??= {})[quality] = ytimg('', { quality, thumb, id })
	//=> reuses id but overwrites thumb and quality
	return final as Record<YTthumb, Record<YTquality, string>>
}
