import { type ReadConf, type FeedData, reader } from '@lib/client'
import { type BuildConf, merge } from '@lib/url'

export type FetchConf = Partial<
	{
		make: BuildConf
		from: URL | string
		opt: RequestInit
	} & ReadConf
>

export interface FeedError {
	type: 'error'
	err: Error | unknown
	conf: FetchConf
	req?: Request | null
	res?: Response | null
}

// optimized browser & server level
// server connection pooling: header keep-alive
// connection persistence in broser: keepalive-true
export const FETCH_OPT: RequestInit = {
	headers: {
		accept: 'application/json',
		'accept-encoding': 'br gzip',
		connection: 'keep-alive',
	},
	keepalive: true,
}

export const fetcher = async (
	conf: FetchConf,
): Promise<FeedData | FeedError> => {
	// store temporary data to enable later debugging
	let final: FeedData | FeedError, url, res, req

	try {
		// if conf.url, use it as a base conf to update
		url = merge(conf?.from ?? {}, conf?.make ?? {})
		if (!url) throw new Error('invalid conf.blogger')

		// keep it for later reference
		req = new Request(url, conf.opt ?? FETCH_OPT)

		// response will be kept for debugging
		res = await fetch(req)
		if (!res.ok) throw new Error('response error')

		// and a copy will be consumed as a stack
		final = await res.clone().json()
		final = reader(final, conf)

		// @ts-ignore mass cleanup
		conf = url = res = req = null
	} catch (err) {
		// output data for user debugging
		final = {
			type: 'error',
			conf,
			err,
			req,
			res,
		}
	}

	return final
}
