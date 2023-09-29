import { make } from '.'

const pagedPosts = () =>
	// a paginated list of posts, from blogger
	make({
		// ✅ must be a valid url.origin
		blog: BLOG,

		// ✖ no postId
		// ...

		// invalid dates or date-strings will be ignored
		'published-max': '2008-12-10',
		// also available...
		// 'updated-max',
		// 'updated-min',
		// 'published-min'

		// orderby and max-results will be added
		// for consistency and explicitness
		// they come from blogger behaviour
		// orderby: "published"
		// "max-results": 25

		// other less relevant params are added in order to
		// mimic blogger's dynamic templates xhr calls
	})

// valid native js url
console.log('⭐', pagedPosts().href)
console.log('⭐', pagedPosts())

// show link in html
export { pagedPosts as link }
