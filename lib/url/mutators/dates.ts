import {
	type BuildMutator,
	type DatePar,
	OK_DATES,
	isoDate,
	useSP,
} from '@lib/url'

export type DatesConf = Partial<{ [k in DatePar]: Date | string | number }>

declare module '@lib/url' {
	interface PagedConf extends DatesConf {}
}

export const dates: BuildMutator = (url, conf) => {
	for (const k of OK_DATES) useSP(url, k, isoDate(conf[k]))
}
