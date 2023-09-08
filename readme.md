# blogger-feeds

[![minzipped](https://badgen.net/bundlephobia/minzip/blogger-feeds?color=blue)](https://bundlephobia.com/package/blogger-feeds) [![typescript](https://badgen.net/npm/types/blogger-feeds)](https://www.npmjs.com/package/blogger-feeds)


Vanilla javascript utilities and helpers for [Blogger](https://www.blogger.com) feeds

![google blogger](./public/blogger-home-page.webp)
*Credits to [Blogger](https://www.blogger.com)*

## :man_technologist: Installation

### npm

```bash
npm i blogger-feeds
```

### cdn

```html
<script type="module">
const { BloggerFeedsUrl } = await import("https://cdn.jsdelivr.net/npm/blogger-feeds@latest")

const MyBlogger = 'https://www.my-blogger.com'

console.log(new BloggerFeedsUrl(MyBlogger) + '')
// https://www.my-blogger.com/feeds/posts/default/?alt=json&dynamicviews=1&rewriteforssl=true&v=2
</script>
```

## :warning: Requirements

You may use the library **directly on a Blogger page** with no setup (i.e. as a *preact / alpinejs widget*).

Since Blogger (*correctly*) enforces strict cors headers, to use the library in every **other environment**:

1. **Blogger must use a custom domain that sends proper [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)**
2. **Dynamic views template and auto SSL rewrites must be enabled**

To setup cors I am currently using [Cloudflare free plan](https://www.cloudflare.com/plans/free) because it is more then plenty for many use cases, but it's just a personal preference. Any other solution is equally viable.

## :wrench: How it works

At its core there is a simple **url builder class** that:

* **extends the native `URL` interface** reusing its api
* enforces and validates **blogger conventions** and parameters
* exposes a **fluent chainable api** over its conventions

All other utilities are mainly convenient wrappers on top of the native `fetch()` api or simple helpers in use by the library itself.

## :thinking: Why

It serves a very specific scenario: **read-only data fetching on Blogger blogs**, when the excellent [Gapi](https://github.com/google/google-api-javascript-client) + [Blogger v3 api](https://developers.google.com/blogger/docs/3.0/reference), may be overkill.

## :muscle: Usage

For more examples, please check out the [tests](./tests/).

```js
import { BloggerFeedsUrl } from 'blogger-feeds'

const BloggerBlog = 'https://www.my-blogger.com',
  PostId = '1234567',
  Label = 'easy-peasy'

// fluent api
const SinglePost = new BloggerFeedsUrl(BloggerBlog)
  .postId(PostId)
  .toString()

console.assert(typeof SinglePost === 'string')
console.log(SinglePost)
// https://www.my-blogger.com/feeds/posts/default/1234567/?alt=json&dynamicviews=1&rewriteforssl=true&v=2

// URL api
const PaginatedPosts = new BloggerFeedsUrl(BloggerBlog)
PaginatedPosts.labels = Label
PaginatedPosts.maxResults = 10

console.assert(PaginatedPosts instanceof URL)
console.log(PaginatedPosts + '')
// https://www.my-blogger.com/feeds/posts/default/?alt=json&dynamicviews=1&max-results=10&q=label:easy-peasy&rewriteforssl=true&v=2
```

## :toolbox: Available exports

* **BloggerFeedsUrl**, url builder
* others coming

## :ballot_box_with_check: TODO

[ ] Other utilities and wrappers
[ ] Minimal Tests
[ ] Write jsdocs
[ ] Documentation

## Disclaimer

This library is **very opinionated**, it was mainly bult for reusability between Blogger projects.
**It is in no way affiliated or approved by [Google](https://www.blogger.com)**.
