import { type BuildMutator, useHF, matchIds } from '@lib/url'

export type SingleConf = {
	postId: string
}

export const single: BuildMutator = (url, conf) => {
	if (matchIds(conf.postId)) {
		useHF(url, 'path', url.pathname + '/' + conf.postId)
		return true // good to go
	}
}
