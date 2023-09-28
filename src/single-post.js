import { make } from '.'

const singlePost = () =>
	// a single post entry, custom domain
	make({
		// ✅ blog must be a valid url.origin
		blog: BLOG,
		// ✅ requires at least 7 digits
		postId: POST_ID,

		// postId resets all params
		// except the required ones
	})

// valid native js url
console.log('⭐', singlePost().href)
console.log('⭐', singlePost())

// show link in html
export { singlePost as link }
