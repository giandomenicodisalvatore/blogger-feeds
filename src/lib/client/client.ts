import {
	type BFPaginatedData,
	type BFfetchconf,
	type UrlLike,
	BFfetch,
	BFmake,
} from '@lib'

export async function* BFclient(conf: BFfetchconf, blog: UrlLike) {
	let pick, signal, next, data

	// prepare config
	if (typeof conf === 'string' || conf instanceof URL) {
		next = BFmake(conf, blog)
	} else {
		;({ pick, signal, ...conf } = (conf ?? {}) as BFfetchconf)
		next = BFmake(conf)
	}

	while (next && !signal?.aborted) {
		yield (data = await BFfetch({ blog: next, signal, pick }))

		// only continue if next paginated
		next = (data as BFPaginatedData)?.meta?.next
			? BFmake(next)?.maxResults(1)
			: null
	}

	return null
}
