import { BFbuild } from '.'

const singlePost = () =>
	// a single post entry, from blogger
	BFbuild({
		// ✅ must be a valid url.origin
		blog: 'blogger',
		// ✅ requires at least 7 digits
		blogId: BLOG_ID,
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
