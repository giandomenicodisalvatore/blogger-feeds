import { UrlLike, safeUrl } from '@lib'

export const extractIds = (
	rawId: string,
): {
	blog?: string
	post?: string
} => {
	const extracted = (rawId + '')
		?.match(/(blog|post)\-\d+/g)
		?.map(e => e.split('-'))
	return Object.fromEntries(extracted ?? [])
}

export const extractLink = (
	links: { rel: UrlLike; href?: UrlLike }[],
	extracted: string,
) => {
	const lnk = links?.find(({ rel }) => rel === extracted)?.href
	return safeUrl(lnk ?? '')
}
