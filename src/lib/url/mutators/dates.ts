import {
	type BuildMutator,
	type DateType,
	OK_DATES,
	BFdate,
	useSP,
} from '@lib/url'

export type DatesConf = Partial<{ [k in DateType]: Date | string | number }>

declare module '@lib/url' {
	interface PagedConf extends DatesConf {}
}

export const dates: BuildMutator = (url, conf) => {
	for (const k of OK_DATES) if (conf[k]) useSP(url, k, BFdate(conf[k]))
}
