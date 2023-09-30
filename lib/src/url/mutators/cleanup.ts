import { type BuildMutator, ALLOWED_PARS, useSP } from '@lib/url'

export const cleanup: BuildMutator = (url, conf) => {
	for (let [k, v] of useSP(url)) // cleanup always
		!(ALLOWED_PARS.has(k) && v) && useSP(url, k, '')
}
