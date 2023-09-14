import { type UrlStr, type BFConf, type BFData, BFFetch, BFBuild } from '@lib'

export async function* BFClient(conf: BFConf, blog: UrlStr) {
	let next = BFBuild(conf, blog),
		fetchOpt = conf?.fetchOpt,
		pick = conf?.pick,
		data

	while (next && !fetchOpt?.signal?.aborted) {
		yield((data = await BFFetch({ blog: next, pick })))
		next = BFBuild((data as BFData)?.meta?.next ?? '')
	}

	// @ts-ignore mass cleanup
	fetchOpt = conf = blog = pick = data = next = null
	return
}
