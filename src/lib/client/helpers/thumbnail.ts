import { type UrlLike } from '@lib'

const BloggerImg =
	/(http.*(?:blogger|blogspot|googleusercontent).*)(?:(\/.*\/)(.*\..*$)|(=s\d+.+?$))/

export const bloggerThumb = (url: UrlLike, size: number = 0) => {
	const matched = (url = url + '').match(new RegExp(BloggerImg)),
		ext = matched?.at(4) ?? ''

	if (!matched) return url

	return ext
		? url.replace(ext, `=s${size}`) // =s0$ variant
		: url.replace(new RegExp(BloggerImg), `$1/s${size}/$3`) // blogger /s0/filename$
}

const YoutubeImg = /(.+?(?:\.?ytimg|\.?youtube)\.com\/vi\/.*\/).+?(\..+?$)/

// https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
export const youtubeHQThumb = (url: UrlLike) =>
	new RegExp(YoutubeImg).test((url = url + ''))
		? url.replace(new RegExp(YoutubeImg), '$1hqdefault$2')
		: url
