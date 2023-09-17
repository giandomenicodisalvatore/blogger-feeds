import { type ReadConf, type Feed, BFread } from '@lib/client'
import { type BuildConf, BFedit } from '@lib/url'

export type FetchConf = {
	blog?: Partial<BuildConf>
	opt?: Partial<RequestInit>
	url?: URL
} & ReadConf

export interface FeedError {
	err: Error | unknown
	conf: FetchConf
	req?: Request | null
	res?: Response | null
}

export const FETCH_OPT = {
	// continue until abort
	keepalive: true,
	// optimized browser & server level
	headers: {
		// enforce connection pooling
		accept: 'application/json',
		'accept-encoding': 'br gzip',
		connection: 'keep-alive',
	},
}

export const BFfetch = async (conf: FetchConf): Promise<Feed | FeedError> => {
	let final, url, res, req

	try {
		url = BFedit(conf.url, conf.blog)
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
