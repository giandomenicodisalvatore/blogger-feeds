import {
	type BloggerConf,
	type UrlLike,
	type BFurl,
	fetchJson,
	BFmake,
} from '@lib'

export { fetchBloggerFeeds as BFfetch }

export function fetchBloggerFeeds(conf: BloggerConf): Promise<any>
export function fetchBloggerFeeds(
	conf: UrlLike | BFurl,
	blog: UrlLike,
): Promise<any>
export function fetchBloggerFeeds(conf: any, blog?: any) {
	return fetchJson(BFmake(conf, blog) + '')
}
