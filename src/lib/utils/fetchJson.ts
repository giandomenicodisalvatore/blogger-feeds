import { MINIMAL_REQUEST, type UrlLike } from '@lib'

export const fetchJson = async (url: UrlLike) =>
	fetch(url + '', MINIMAL_REQUEST).then(r => r.json())
