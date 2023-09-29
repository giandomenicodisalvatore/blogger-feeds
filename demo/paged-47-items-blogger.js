import { make } from '.'

const pagedPosts = () =>
	// a paginated list of posts, from blogger
	make({
		// ✅ must be a valid url.origin
		blog: 'blogger',
		// ✅ requires at least 7 digits
		blogId: BLOG_ID,

		// ✖ no postId
		// ...

		// max-results dictates page size
		// clamped between 1 and 150
		// to prevent blogger errors
		'max-results': 47,

		// orderby defaults to
		// orderby: "published"

		// other less relevant params are added in order to
		// mimic blogger's dynamic templates xhr calls
	})

// valid native js url
console.log('⭐', pagedPosts().href)
console.log('⭐', pagedPosts())

// show link in html
export { pagedPosts as link }
