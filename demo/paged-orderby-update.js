import { BFbuild } from '.'

const pagedPosts = () =>
	// a paginated list of posts, from blogger
	BFbuild({
		// ✅ must be a valid url.origin
		blog: BLOG,

		// ✖ no postId
		// ...

		// ordered by last update
		orderby: 'updated',

		// max-results defaults to
		// "max-results": 25

		// other less relevant params are added in order to
		// mimic blogger's dynamic templates xhr calls
	})

// valid native js url
console.log('⭐', pagedPosts().href)
console.log('⭐', pagedPosts())

// show link in html
export { pagedPosts as link }
