import { type FetchConf, type ReadConf, BFfetch } from '@lib/client'
import { BFedit } from '@lib/url'

export type ClientConf = FetchConf & ReadConf

export const BFclient = async function* (conf: ClientConf) {
	let next = BFedit(conf.url, conf.blog),
		{ opt, pick } = conf,
		data

	while (next && !opt?.signal?.aborted) {
		yield (data = await BFfetch({ url: next, pick }))
		next = BFedit((data as any)?.meta?.next)
	}

	// @ts-ignore mass cleanup
	fetchOpt = conf = blog = pick = data = next = null
}
