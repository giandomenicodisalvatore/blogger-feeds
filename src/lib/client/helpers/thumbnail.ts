import { type UrlLike } from '@lib'

const BFimg =
	/(http.*(?:blogger|blogspot|googleusercontent).*)(?:(\/.*\/)(.*\..*$)|(=s\d+.+?$))/

export const BFthumb = (url: UrlLike, size: number = 0) => {
	const matched = (url = url + '').match(new RegExp(BFimg)),
		ext = matched?.at(4) ?? ''
	return (!matched && url) || ext
		? url.replace(ext, `=s${size}`) // =s0$ variant
		: url.replace(new RegExp(BFimg), `$1/s${size}/$3`) // blogger /s0/filename$
}

const YTimg = /(.+?(?:\.?ytimg|\.?youtube)\.com\/vi\/.*\/).+?(\..+?$)/

// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
export const BFytimg = (url: UrlLike) =>
	new RegExp(YTimg).test((url = url + ''))
		? url.replace(new RegExp(YTimg), '$1hqdefault$2')
		: url
