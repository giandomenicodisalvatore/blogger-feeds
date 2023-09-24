import { type ReadConf, type Feed, BFread } from '@lib/client'
import { BFbuild, type BuildConf } from '@lib/url'

export type FetchConf = Partial<
	{
		build: BuildConf
		url: URL | string
		opt: RequestInit
	} & ReadConf
>

export interface FeedError {
	err: Error | unknown
	conf: FetchConf
	req?: Request | null
	res?: Response | null
}

export const FETCH_OPT: RequestInit = {
	// optimized browser & server level
	headers: {
		// enforce connection pooling
		accept: 'application/json',
		'accept-encoding': 'br gzip',
		connection: 'keep-alive',
	},
	// continue until abort
	keepalive: true,
}

export const BFfetch = async (conf: FetchConf): Promise<Feed | FeedError> => {
	let final, url, res, req

	try {
		// if conf.url, use it as a base conf to update
		url = BFbuild(
			Object.assign(conf?.url ?? {}, conf?.build ?? {}) as BuildConf,
		)
		if (!url) throw new Error('invalid conf.blogger')

		req = new Request(url, conf.opt ?? FETCH_OPT)

		// this will be kept for debugging
		res = await fetch(req)
		if (!res.ok) throw new Error('response error')

		// this copy will be consumed as a stack
		final = await res.clone().json()
		final = BFread(final, conf)

		// @ts-ignore mass cleanup
		conf = url = res = req = null
	} catch (err) {
		final = {
			conf,
			err,
			req,
			res,
		}
	}

	return final
}
