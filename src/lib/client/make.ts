import {
	type OrderbyLike,
	type LabelLike,
	type DateLike,
	type UrlLike,
	BFurl,
} from '@lib'

export type BFpostConf = {
	blog: UrlLike
	post: UrlLike
}

export type BFpaginatedConf = {
	blog: UrlLike
	// paginated
	orderby?: OrderbyLike
	'max-results'?: number
	'start-index'?: number
	searched?: string
	labels?: LabelLike
	'published-max'?: DateLike
	'published-min'?: DateLike
	'updated-max'?: DateLike
	'updated-min'?: DateLike
}

export type BFconf = BFpostConf | BFpaginatedConf

export const safeUrl = (url: UrlLike, base?: UrlLike) => {
	try {
		url = new URL(decodeURIComponent(url + ''), base)
		return url
	} catch {
		return null
	}
}

export function BFmake(conf: BFconf | BFurl | UrlLike): BFurl | null
export function BFmake(conf: BFurl | UrlLike, blog: UrlLike): BFurl | null
export function BFmake(conf: any, blog?: any) {
	try {
		const url =
			(safeUrl(conf, blog) && new BFurl(conf, blog)) ||
			Object.assign(new BFurl(conf.blog), conf)
		return url
	} catch {
		return null
	}
}
