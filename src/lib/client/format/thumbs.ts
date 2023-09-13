import { type UrlLike } from '@lib'

const BFimg =
	/(http.*(?:blogger|blogspot|googleusercontent).*)(?:(\/.*\/)(.*\..*$)|(=s\d+.+?$))/
// if is blogspot, group with following path
// when you find the extension, keep it and the last path segment
// last path segment represents size in this case
// when you find =s and digits at the end of the url
// keep it as the representation of size

export const BFthumb = (url: UrlLike, size: number = 0) => {
	const matched = (url = url + '').match(new RegExp(BFimg)),
		ext = matched?.at(4)

	// in order to replace the size
	return (!matched && url) || ext
		? url.replace(ext ?? '', `=s${size}`) // =s0$ variant
		: url.replace(new RegExp(BFimg), `$1/s${size}/$3`) // blogger /s0/filename$
}

const YTimg = /(.+?(?:\.?ytimg|\.?youtube)\.com\/vi\/.*\/).+?(\..+?$)/
// if is youtube, group whatever you find until last path segment
// save last path segment as extension

// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
export const BFytimg = (url: UrlLike) =>
	// in order to replace the filename
	new RegExp(YTimg).test((url = url + ''))
		? url.replace(new RegExp(YTimg), '$1hqdefault$2')
		: url
