import { UrlLike, safeUrl } from '@lib'

export const extractLink = (
	links: { rel: UrlLike; href?: UrlLike }[],
	extracted: string,
) => safeUrl(links?.find(({ rel }) => rel === extracted)?.href ?? '')
