import { UrlLike } from '@lib'

export const extractLink = (
	links: { rel: UrlLike; href?: UrlLike }[],
	extracted: string,
) => links?.find(({ rel }) => rel === extracted)?.href ?? ''
