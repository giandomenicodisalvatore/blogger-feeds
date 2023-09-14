# blogger-feeds

[![minzipped](https://badgen.net/bundlephobia/minzip/blogger-feeds?color=blue)](https://bundlephobia.com/package/blogger-feeds) [![typescript](https://badgen.net/npm/types/blogger-feeds)](https://www.npmjs.com/package/blogger-feeds)

Vanilla javascript client, url builder and helpers for [Blogger](https://www.blogger.com) feeds

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
const { BFClient, BFUrl } = await import("https://cdn.jsdelivr.net/npm/blogger-feeds@latest")
// normal usage
</script>
```

## :warning: Requirements

You may use the library **directly on a Blogger page** with no setup.

Since Blogger *correctly* enforces strict *CORS headers*, in order to use the library in every **other environment**:

1. Blogger must use a **custom domain sending proper [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)**
2. **Dynamic views** template and auto **SSL rewrites** must be enabled

To setup CORS on an uncontrolled server I am using [Cloudflare free plan](https://www.cloudflare.com/plans/free) because it offers more then enough for many use cases. But it's just my personal taste, any other solution is equally viable.

## :wrench: How it works

At its core there is a simple **url class** that:

* **extends the native `URL` interface** reusing its api
* enforces and validates **blogger conventions** and parameters
* exposes a **fluent chainable api** over its conventions

The **client** is a vanilla js **async function generator** that:

* builds on top of the native `fetch()`
* chunking data in single paginated bits
* can be used in a `for await ... of` loop

I chose to stick as much as possible to:

* **async function generator client**
* **FIFO (first-in first-out) approach**  

because some posts **may be very data-heavy** and, when paginated, they may quickly add and become challenging on both the connection and the device.

## :thinking: Why

The library serves a very specific scenario: **read-only data fetching on Blogger blogs**, when the excellent [Gapi](https://github.com/google/google-api-javascript-client) + [Blogger v3 api](https://developers.google.com/blogger/docs/3.0/reference) may be overkill (i.e. a lightweight *preact / alpinejs widget*).

## :muscle: Usage

```js
import { BFUrl, BFClient } from 'blogger-feeds'

//----------------------
// url builder instance
//----------------------

const MyBlog = 'https://www.my-blogger.com',
  MyLabels = ['it', ['just', 'works']],
  PostId = '1234567', // at least 7 digits

// fluent api
const SinglePostUrl = new BFUrl(MyBlog)
  .postId(PostId)
  .toString()

console.log(SinglePostUrl)
// https://www.my-blogger.com/feeds/posts/default/1234567/?alt=json&dynamicviews=1&rewriteforssl=true&v=2

// native url api
const PaginatedPostsUrl = new BFUrl(MyBlog)
PaginatedPostsUrl.labels = MyLabels
PaginatedPostsUrl.maxResults = 10

console.log(PaginatedPostsUrl + '')
// https://www.my-blogger.com/feeds/posts/default/?alt=json&dynamicviews=1&max-results=10&q=label:it|label:just,works&rewriteforssl=true&v=2

//----------------------
// client fn generator
//----------------------

const Aborter = new AbortController(),
  OnlyProps = ['id', 'href']

const DefaultClient = BFClient({
  blog: MyBlog, // must be valid

  fetchOpt: { // abortable!
    signal: Aborter.signal
  }
  
  pick: OnlyProps // cherry pick props

  "max-results": null // defaults to 10
})

for await (const feed of DefaultClient) {
  console.log(feed) 
  // {meta: {...}, data: Array(10)} 
}

const PaginatedClient = BFClient({
  blog: MyBlog,
  "max-results": 4242
  // pagination clamped between 1 and 150
  // to avoid triggering blogger errors
})

for await (const paginated of PaginatedClient) {
  console.log(paginated)
  // {meta: {...}, data: Array(150)} 
  // meta["max-results"] >= 1
  // meta.post => null
}

const PostClient = BFClient({
  blog: MyBlog,
  post: PostId,
})

for await (const post of PostClient) {
  console.log(post) // always 1 post in data
  // {meta: {...}, data: Array(1)}
  // meta["max-results"] => null
  // meta.post => "1234567"
}
```

## :toolbox: Available exports

### Core

* BFClient, async generator optimized for any use case
* BFUrl, blogger url builder extending URL interface

### Helpers

* BFBuild, quietly creates BFUrl
* BFFetch, wrapper over fetch api
* BFParse, lazily parses feeds
* BFGetId, lazily parses ids from links
* BFThumb, blogger image url resizer
* BFYTimg, youtube default thumbnail

## :ballot_box_with_check: TODO

[ ] Write jsdocs & documentation
[ ] Re-write minimal tests

## Disclaimer

This library is **very opinionated**, it was built for reusability between personal Blogger projects.
**It is neither affiliated or approved by [Google](https://www.blogger.com)**.
