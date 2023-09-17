const BFimg =
	/(http.*(?:blogger|blogspot|googleusercontent).*)(?:(\/.*\/)(.*\..*$)|(=s\d+.+?$))/
// if blogspot, group with following path
// keep filename and last segment that represents size
// if "=s" and digits, that's noname notation

export const BFthumb = (url: URL | string, size: number = 0) => {
	const matched = (url = url + '').match(new RegExp(BFimg)),
		// when in doubt, s0 opts for original image
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
export const BFytimg = (url: URL | string) =>
	new RegExp(YTimg).test((url = url + '')) // replace the filename
		? url.replace(new RegExp(YTimg), '$1hqdefault$2')
		: url
