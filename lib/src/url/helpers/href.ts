/**
 * Replace parts of url
 * * only works on string parts
 */
export const useHF = (
	url: URL,
	target: keyof typeof url | 'blog' | 'path',
	str: string,
) => {
	switch (target) {
		case 'origin':
		case 'blog':
			url.href = url.href.replace(url.origin, str)
			break
		case 'pathname':
		case 'path':
			url.pathname = str
			break
		case 'search':
		case 'searchParams':
			url.search = str
			break
		case 'href':
			url.href = str
			break
	}
	return url
}
