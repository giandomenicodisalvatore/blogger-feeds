# 📰 blogger-feeds

[![minzipped](https://badgen.net/bundlephobia/minzip/blogger-feeds?color=blue)](https://bundlephobia.com/package/blogger-feeds) [![typescript](https://badgen.net/npm/types/blogger-feeds)](https://www.npmjs.com/package/blogger-feeds)

Fully typed javascript url builder and client for [Blogger](https://www.blogger.com) feeds

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
const { BFbuild } = await import("https://cdn.jsdelivr.net/npm/blogger-feeds@latest")
// take a look at https://github.com/giandomenicodisalvatore/blogger-feeds/tree/main/demo
</script>

```

## :thinking: Why

The library serves a very specific scenario: **read-only data fetching on Blogger blogs**, when the excellent [Gapi](https://github.com/google/google-api-javascript-client) + [Blogger v3 api](https://developers.google.com/blogger/docs/3.0/reference) combo may be overkill (i.e. a lightweight *preact / alpinejs widget*).

## :warning: Requirements

You may use the library **directly on a Blogger page** with no setup.

Since Blogger *correctly* enforces strict *CORS headers*, in order to use it in every **other environment**:

1. Blogger must be setup to use a **custom domain sending proper [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)**
2. **Dynamic views** template and auto **SSL rewrites** should be enabled (but may not always be required)

To setup CORS I am using [Cloudflare free plan](https://www.cloudflare.com/plans/free) because it offers more then enough for many use cases. But it's just my personal taste, any other domain-level solution is equally viable.

## :wrench: How it works

### Url builder: BFbuild()

At its core there is a simple **url builder function** that:

* **takes blogger params** and builds a native js URL objet
* enforces and validates parameters against **blogger conventions**

### Client function: BFclient()

:warning: In active development

The **client** is a vanilla js **async function generator** that:

* builds on top of the native `fetch()`
* chunking data in single paginated bits
* can be used in a `for await ... of` loop

I chose to stick as much as possible to:

* **async function generator client**
* **FIFO (first-in first-out) approach**  

because some posts **may be very data-heavy** and, when paginated, they may quickly add up and become challenging on both the connection and the device.

## :muscle: Usage

Feel free to explore the [demo folder](https://github.com/giandomenicodisalvatore/blogger-feeds/tree/main/demo) for more examples or take a look at the demo at

### Url builder

```js
import { BFbuild } from 'blogger-feeds'

//----------------------
// url builder function
//----------------------

const MyBlog = 'https://www.my-blogger.com',
  PostId = '1234567', // at least 7 digits

// fluent api
const SinglePostUrl = BFbuild({
  blog: MyBlog,
  postId: PostId,
})

console.log(SinglePostUrl + '')
// https://www.my-blogger.com/feeds/posts/default/1234567/?alt=json&dynamicviews=1&rewriteforssl=true&v=2
```

### Client generator

:warning: Still in active development

```js
import { BFclient } from 'blogger-feeds'

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

const PostClient = BFClient({
  blog: MyBlog,
  post: PostId,
})

for await (const post of PostClient) {
  console.log(post) // always 1 post in data
  // {meta: {...}, data: Array(1)}
}
```

## :ballot_box_with_check: TODO

[ ] Write jsdocs & documentation
[ ] Re-write minimal tests

## Disclaimer

This library is **very opinionated**, it was built for reusability between personal Blogger projects and it is not meant to replace GAPI client in any way. It's just a different approach for a read-only scenario heavily inspired by blogger's own dynamic templates.
**It is neither affiliated or approved by [Google](https://www.blogger.com)**.
