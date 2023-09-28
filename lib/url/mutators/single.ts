import { type BuildMutator, useHF, matchIds } from '@lib/url'

export type SingleConf = {
	postId?: string
}

export const single: BuildMutator = (url, conf) =>
	Boolean(
		matchIds(conf?.postId ?? '') &&
			useHF(url, 'path', url.pathname + '/' + conf.postId),
	)
