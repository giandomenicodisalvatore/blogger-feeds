import { type UrlStr } from '@lib'

export const isBlogspot = (url: UrlStr) => /blog(ger|spot)/.test(url + '')

export type BFIds = Record<'blog' | 'post', string | null>

export const BFGetId = (str: UrlStr) => {
	// it should work for both blogger urls && example
	let matched = (str = str + '').matchAll(/\d{7,}/g),
		// normal (7 digits)
		// https://www.example.com/___POST_ID___/
		extracted: BFIds = { blog: null, post: null },
		// blogger (blogger.com/feeds & 7 digits)
		// https://www.blogger.com/feeds/___BLOG_ID___/posts/default/___POST_ID___/
		blogspot = isBlogspot(str),
		id

	for (id of matched)
		if ((id = id.at(0)))
			if (blogspot && !extracted.blog) extracted.blog = id
			else extracted.post = id

	return extracted
}
