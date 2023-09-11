export const extractAuthor = (author: any = {}) => ({
	name: author?.name?.$t,
	profile: author?.uri?.$t,
	email: author?.email?.$t,
})
