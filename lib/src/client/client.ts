import { type FetchConf, type ReadConf, fetcher } from '@lib/client'

export type ClientConf = FetchConf & ReadConf

export const client = async function* (conf: ClientConf) {
	let { opt, keep } = conf,
		next,
		data

	do {
		// in fetcher: fault-tolerance
		// and url configuration is already done
		data = !data
			? await fetcher(conf)
			: await fetcher({
					from: next,
					keep,
					opt,
			  })

		// in schemas: url reuse
		// so that it can continue fetching
		next = data?.type === 'data' && data?.meta?.next

		// heavy lifting is already done
		// at lower levels, now we can just iterate
		yield data

		// continue as long as next is available
	} while (next && !opt?.signal?.aborted)

	// @ts-ignore: mass cleanup
	conf = keep = data = next = opt = null
}
