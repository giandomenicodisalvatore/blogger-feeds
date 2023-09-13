import {
	type BFPaginatedData,
	type BFPostData,
	type UrlLike,
	type BFpick,
	type BFurlconf,
	type BFurl,
	BFformat,
	BFmake,
} from '@lib'

const FETCH_OPT = {
	headers: { accept: 'application/json' },
	keepalive: true,
}

export type BFfetchconf = BFurlconf & {
	signal?: AbortSignal
	pick?: BFpick
}

export type BFdata = BFPostData | BFPaginatedData | BFerr

export type BFerr = {
	url: BFurl | null
	err: Error | any
	res?: Response
}

export function BFfetch(conf: BFfetchconf): Promise<BFdata>
export function BFfetch(conf: UrlLike, blog?: UrlLike): Promise<BFdata>
export async function BFfetch(conf: any, blog?: any) {
	let data, url, res

	try {
		url = BFmake(conf, blog)
		if (!url) throw new Error('URL_ERROR')

		// copy for debugging
		res = await fetch(url + '', { ...FETCH_OPT, signal: conf?.signal })
		if (!res.ok) throw new Error('RESPONSE_ERROR')

		// copy to consume
		data = await res.clone().json()
		data = BFformat(data, conf?.pick)

		// cleanup
		url = res = conf = blog = null

		// throw
	} catch (err) {
		data = { url, err, res }
	}

	return data as BFdata
}
