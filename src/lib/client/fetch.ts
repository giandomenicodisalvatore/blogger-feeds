import {
	type BFPaginatedData,
	type BFPostData,
	type UrlLike,
	type BFconf,
	type BFurl,
	BFformat,
	BFmake,
	BFpick,
} from '@lib'

const RequestOpt = {
	headers: { accept: 'application/json' },
	keepalive: true,
}

export function BFfetch(
	conf: BFconf & {
		pick?: BFpick[]
	},
): Promise<BFData>
export function BFfetch(
	conf: UrlLike | BFurl,
	blog?: UrlLike,
	pick?: BFpick[],
): Promise<BFData>
export async function BFfetch(conf: any, blog?: any, pick?: any) {
	let url, data
	try {
		url = BFmake(conf, blog) ?? 'INVALID'
		data = await fetch(url, RequestOpt)
		data = await data.json()
		return BFformat(data, conf?.pick ?? pick)
	} catch (error) {
		return { error, data, url } as BFError
	}
}

export type BFData = BFPostData | BFPaginatedData | BFError

export type BFError = {
	error: any
	data?: any
	url?: any
}
