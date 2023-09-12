import {
	type BFPaginatedData,
	type BFPostData,
	type UrlLike,
	type BFconf,
	type BFurl,
	BFformat,
	BFmake,
} from '@lib'

const RequestOpt = {
	headers: { accept: 'application/json' },
	keepalive: true,
}

export function BFfetch(conf: BFconf): Promise<BFData>
export function BFfetch(conf: UrlLike | BFurl, blog: UrlLike): Promise<BFData>
export async function BFfetch(conf: any, blog?: any) {
	try {
		let data: any = await fetch(BFmake(conf, blog) ?? 'invalid url', RequestOpt)
		if (!data.ok) throw data

		data = await data.json()
		data = BFformat(data)
		return data
	} catch (e) {
		return { error: e } as BFError
	}
}

export type BFData = BFPostData | BFPaginatedData | BFError

export type BFError = { error: any }
