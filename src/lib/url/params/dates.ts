import {
	DATE_PARAMS,
	isoDateStr,
	type DateLike,
	type BloggerFeedsUrl,
} from '@lib'

export type DateParamLike =
	| 'published-max'
	| 'published-min'
	| 'updated-max'
	| 'updated-min'

export function getDateParams(url: BloggerFeedsUrl, par: DateParamLike) {
	return (DATE_PARAMS.has(par) && url.searchParams.get(par)) || ''
}

export function setDateParams(
	url: BloggerFeedsUrl,
	par: DateParamLike,
	date: DateLike,
) {
	if (DATE_PARAMS.has(par) && (date = isoDateStr(date) ?? ''))
		url.searchParams.set(par, date)
}
