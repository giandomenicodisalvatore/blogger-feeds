import {
	type BloggerOrderBy,
	type LabelLike,
	type DateLike,
	type UrlLike,
	BFurl,
} from '@lib'

export type BloggerBlog = {
	blog: UrlLike
}

export type BloggerPost = BloggerBlog & {
	post: UrlLike
}

export type BloggerPaginated = BloggerBlog & {
	// paginated
	orderby?: BloggerOrderBy
	'max-results'?: number
	'start-index'?: number
	searched?: string
	labels?: LabelLike
	'published-max'?: DateLike
	'published-min'?: DateLike
	'updated-max'?: DateLike
	'updated-min'?: DateLike
}

export type BloggerConf = BloggerPost | BloggerPaginated

export { makeBloggerFeedsUrl as BFmake }

export function makeBloggerFeedsUrl(conf: BloggerConf): BFurl
export function makeBloggerFeedsUrl(conf: UrlLike | BFurl, blog: UrlLike): BFurl
export function makeBloggerFeedsUrl(conf: any, blog?: any) {
	return typeof conf?.blog !== 'undefined'
		? Object.assign(new BFurl(conf.blog), conf)
		: new BFurl(conf, blog)
}
