import { type BuildMutator, ALLOWED_PARS, useSP } from '@lib/url'

export const cleanup: BuildMutator = (url, conf) => {
	for (let [k, v] of useSP(url)) // cleanup always
		if (!(v = ALLOWED_PARS.has(k) && v ? v : '')) useSP(url, k, v)
}
