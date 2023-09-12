import { type UrlLike, type BFurl } from '@lib'
import { wit } from 'weaken-it'

const POST_RGX = /\d{7,}/

export const getPost = (url: BFurl): string | null => wit(url, 'post') || null

export const setPost = (url: BFurl, post: UrlLike) =>
	(post = getPostId(post) ?? '') && wit(url, 'post', post)

export const getPostId = (str: UrlLike) =>
	(str + '').match(new RegExp(POST_RGX))?.at(0) || null
