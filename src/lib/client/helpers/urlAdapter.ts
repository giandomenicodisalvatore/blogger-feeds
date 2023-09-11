import { UrlLike } from '@lib'

export const urlAdapter = (
	url: UrlLike,
	{ blog, blogId }: { blog: UrlLike; blogId: string },
) =>
	(url + '')
		.replace(new URL(url).origin + '/', blog + '')
		.replace(`/${blogId}/`, '/') || null
