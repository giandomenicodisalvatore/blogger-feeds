# 📰 blogger-feeds

[![minzipped](https://badgen.net/bundlephobia/minzip/blogger-feeds?color=blue)](https://bundlephobia.com/package/blogger-feeds) [![typescript](https://badgen.net/npm/types/blogger-feeds)](https://www.npmjs.com/package/blogger-feeds)

Fully typed javascript url builder and client for [Blogger](https://www.blogger.com) feeds

![google blogger](./public/blogger-home-page.webp)
*Credits to [Blogger](https://www.blogger.com)*

## :man_technologist: Installation

### Npm

```bash
npm i blogger-feeds
```

### Cdn

```html
<script type="module">
const { make } = await import("https://cdn.jsdelivr.net/npm/blogger-feeds@latest/core")
// take a look at https://github.com/giandomenicodisalvatore/blogger-feeds/tree/main/demo
</script>

```

### Exports

Then you can import just what you need to further tree-shake the package size. For this reason, the package also provides some additional exports:

```js
// imports all the package
import * as BF from "blogger-feeds 

// just the url builder
import { make } from "blogger-feeds/core"

// just the client
import { client } from "blogger-feeds/client"

// some related helpers
import { 
  isoDate, // format date to blogger-compatible params  
  merge, // merges two blogger urls or configs
  thumb, // get the url to resized blogger thumbnail image
  ytimg, // get the url to the default youtube hq thumbnail
} from "blogger-feeds/helpers"
```

## :thinking: Why

The library serves a very specific scenario: **read-only data fetching on Blogger blogs**, when the excellent [Gapi](https://github.com/google/google-api-javascript-client) + [Blogger v3 api](https://developers.google.com/blogger/docs/3.0/reference) combo may be overkill (i.e. a lightweight *preact / alpinejs widget*).

## :warning: Requirements

The url builder `make()` at the core of the package works by itself.

You may use the `client()` **directly on a Blogger page** with no additional setup, but you may incur in CORS errors since Blogger *correctly* enforces strict *CORS headers*. In order to use `client()` in  **any environment**:

1. Blogger must be setup with a **custom domain**
2. the domain should be **sending proper [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)**

To achieve this setup I am using [Cloudflare's generous free plan](https://www.cloudflare.com/plans/free) because it offers more than enough for many use cases. But any other domain-level solution is equally viable.

## :wrench: How it works

### Url builder: make()

At its core there is a simple **url builder function** that:

* **takes blogger params** and builds a validated native js URL
* enforces and validates parameters against **Blogger conventions**
* returns a safe URL to the requested resource or paginated list of feeds

### Client generator: client()

The client is a vanilla js **async function generator** that:

* builds on top of the native `fetch()`
* chunking data in single paginated bits
* can be used in a `for await ... of` loop
* returns a **simplified fully-typed feed object**

Please note that the returned **Feed object is not the fetched data**, but a simplified object holding simplified meta data for the request and a simplified version of the data entries.

:warning: **No sanitization is applied to the content returned from Blogger**. Please make sure to **sanitize data.content html output** using an html sanitizer library (like [dom-purify](https://github.com/cure53/DOMPurify), [sanitize-html](https://github.com/apostrophecms/sanitize-html), [js-xss](https://jsxss.com/en/index.html)...)

## :muscle: Usage

Feel free to explore the [demo folder](https://github.com/giandomenicodisalvatore/blogger-feeds/tree/main/demo) for more examples or take a look at the demo at

```js
import { make, client } from 'blogger-feeds'

//----------------------
//  url builder
//----------------------

const SinglePostUrl = make({
  // you may pass "blogger" to get the blogger.com equivalent
  blog: new URL("https://www.my-blogger.com"),
  postId: "1234567", // at least 7 digits
})

console.log(SinglePostUrl?.href) // null if invalid config

const PagedPostsUrl = make({
  blog: new URL("https://www.my-blogger.com"),
  // never pass a valid postId
  "max-results": 12
})


//----------------------
//  client generator
//----------------------

const Aborter = new AbortController()

const DefaultClient = client({
  make: {
    // same config as make()
    blog: new URL("https://www.my-blogger.com")
  }, 

  // from: "valid blogger feeds url"
  // if you want to merge other params

  opt: { // abortable
    signal: Aborter.signal
  }
  
  // cherry pick props
  keep: ["href", "title", "image"] 

  // max-results defaults to 25
})

for await (const feed of DefaultClient) {
  console.log(feed) 
  // {meta: {...}, data: Array(10)} 
}

const PostClient = client({
  // reuse this url
  url: SinglePostUrl

  make: {
    // with new params
    postId: '9876543'
  }
})

for await (const post of PostClient) {
  console.log(post) // always 1 post in data
  // {meta: {...}, data: Array(1)}
}
```

## Disclaimer

This library is **very opinionated**, it was born by consolidating various snippets I used on many Blogger custom js widgets. It may not be thoroughly tested, but it's profitably employed in a number of **public-facing production blogs**.

It isn't meant to replace GAPI client in any way, it's just a different approach to obtain posts data in a read-only scenario, heavily inspired by Blogger's own dynamic templates. **It is neither affiliated or approved by [Google](https://www.blogger.com)**.
