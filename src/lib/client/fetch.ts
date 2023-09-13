import {
	type BFPaginatedData,
	type BFPostData,
	type UrlLike,
	type BFpick,
	type BFconf,
	type BFurl,
	BFformat,
	BFmake,
} from '@lib'

const FETCH_OPT = {
	headers: { accept: 'application/json' },
	keepalive: true,
}

export type BFfetchconf = BFconf & {
	signal: AbortSignal
	pick?: BFpick
}

export type BFData = BFPostData | BFPaginatedData | BFError

export type BFError = {
	url: BFurl | null
	err: Error | any
	res?: Response
}

export function BFfetch(conf: BFfetchconf): Promise<BFData>
export function BFfetch(conf: UrlLike, blog?: UrlLike): Promise<BFData>
export async function BFfetch(conf: any, blog?: any) {
	let data, url, res

	try {
		// create url and separate pick
		url = BFmake(conf, blog) as BFurl | null
		if (!url) throw new Error('URL_ERROR')

		// untouched for debugging
		res = (await fetch(url + '', {
			...FETCH_OPT,
			signal: conf?.signal,
		})) as Response
		if (!res.ok) throw new Error('RESPONSE_ERROR')

		// consume a clone
		data = await res.clone().json()
		data = BFformat(data, conf?.pick) as BFPostData | BFPaginatedData

		// cleanup
		url = res = conf = blog = null
	} catch (err: Error | any) {
		// or error
		data = { url, err, res } as BFError
	}

	return data
}
