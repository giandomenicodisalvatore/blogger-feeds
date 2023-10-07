# 📰 blogger-feeds

[![minzipped](https://badgen.net/bundlephobia/minzip/blogger-feeds?color=blue)](https://bundlephobia.com/package/blogger-feeds) [![typescript](https://badgen.net/npm/types/blogger-feeds)](https://www.npmjs.com/package/blogger-feeds)

Fully typed url builder, client and utilities for [Blogger](https://www.blogger.com) feeds

<img width="300" src="./docs/public/blogger-feeds-logo.svg" />

*We ❤ [Blogger](https://www.blogger.com)*

## 👨‍💻 Installation

### Via npm

``` bash
pnpm i blogger-feeds
```

### Via cdn

``` html
<script type="module">
const { make } = await import("https://cdn.jsdelivr.net/npm/blogger-feeds@latest/core")
</script>

```

## 📦 Available exports

You can import just what you need to further tree-shake the package size

``` js
// Imports all at once
import * as BF from "blogger-feeds";

import { 
  make, // just the url builder function
} from "blogger-feeds/core";

import { 
  client, // just the client async generator
} from 'blogger-feeds/client';

import { 
  isoDate, // blogger-compatible date formatter
  merge, // merges blogger feeds urls or configs
  thumb, // remaps a blogger image url to a resized version
  ytimg, // remaps a youtube url to its default hq thumbnail
} from "blogger-feeds/helpers";
```

## 🤔 Why

This library serves a very specific use-case: **read-only posts fetching on Blogger blogs**, when the excellent [Gapi](https://github.com/google/google-api-javascript-client) + [Blogger v3 api](https://developers.google.com/blogger/docs/3.0/reference) may be *"overkill"*. In example when building a lightweight *preact / alpinejs widget*.

## 🔧 How it works

### Url builder: `make()`

It's very a simple **url builder function**:

* builds on top of the **native js URL interface**
* takes a fully typed config object of **blogger params**
* validates them against **Blogger conventions**
* builds a native js URL to the requested resource
* **explicits blogger defaults**
* normalizes the url for cache consistency

### Client generator: `client()`

An **async function generator** that:

* builds on top of the **native `fetch()` api**
* **lazily loops** over all posts starting from input
* reuses Blogger's own pagination features
* can be used in a handy **`for await ... of` loop**
* returns a **fully-typed feed object** (caveat)
* or a fully transparent error object

## ✔ Requirements

The url builder `make()` at the core of the package works by itself, enforcing parameter-level **validation** and expliciting blogger defaults for **url consistency** (helping caches work).

You may use the `client()` **directly on a Blogger page** with no additional setup. But in **any other environment**, since Blogger *correctly* enforces strict *CORS headers*, you are most likely to incur into **cors issues**. To avoid that:

1. Blogger must be setup with a **custom domain**
2. that domain should be **sending proper [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)**

To achieve this setup I am using [Cloudflare's generous free plan](https://www.cloudflare.com/plans/free), but any other solution is equally viable as long as it allows to enforce **your own cors headers**.

## ⚠ Caveats

1. Please note that the **Feed object is not the fetched data**, but a **simplified representation** exposing:
   * **relevant meta data** related to the request itself
   * a flattened **choice of relevant data entries**

2. Should you need to access feeds data you may prefer to avoid the client and directly fetch the url.

3. **No sanitization is applied to any content returned from Blogger feeds**. Please make sure to **sanitize data.content html output** using an html sanitizer library (like [dom-purify](https://github.com/cure53/DOMPurify), [sanitize-html](https://github.com/apostrophecms/sanitize-html), [js-xss](https://jsxss.com/en/index.html)...)

## 💪 Usage

``` js
//----------------------
//  import what you need
//----------------------

import { make, client } from "blogger-feeds";

//----------------------
//  build an url
//----------------------

const SinglePostUrl = make({
  // you may pass "blogger" to get the blogger.com equivalent
  blog: new URL("https://www.my-blogger.com"),
  
  postId: "1234567", // at least 7 digits
  
  // postId takes precedence over any other params
  // all the rest will be ignored
});

// null if invalid config
console.log(SinglePostUrl?.href);

const PagedPostsUrl = make({
  blog: new URL("https://www.my-blogger.com"),
  
  // never pass a valid postId 
  // when you need a paginated list
  
  // blogger's defaults will be added for consistency
  // "max-results": defaults to 25
  // "start-index": defaults to 1
  // "orderby": defaults to "published"
});

console.log(PagedPostsUrl?.href);

//----------------------
//  fetch a resource
//----------------------

// you may abort the client at any moment
const Aborter = new AbortController();

const DefaultClient = client({
  make: {
    // same config as make()
    blog: new URL("https://www.my-blogger.com"),
  },

  opt: { 
    // custom fetch options
    signal: Aborter.signal,
  },
  
  // cherry-pick meta or post props
  keep: ["href", "title", "image"],
});

for await (const feed of DefaultClient) {
  console.log(feed); // {meta: {...}, data: Array(25)} 
  // it loops as long as there are still posts to fetch 
  // take a look at meta.next
}

const PostClient = client({
  // reuse this url
  from: SinglePostUrl,

  make: {
    // with new params
    postId: '9876543',
  }
})

for await (const post of PostClient) {
  console.log(post); // {meta: {...}, data: Array(1)}
  // always 1 post in data array
}
```

## Disclaimer

This library is **very opinionated**, it was built to consolidate code patterns from **custom Blogger widgets** currently employed in **public-facing production blogs**.

I remark that it is **not meant to replace GAPI client**, but it's just a different approach to fetch published posts in a **read-only scenario**, heavily inspired by Blogger's own dynamic templates.

**The library is neither affiliated or approved by [Google Blogger](https://www.blogger.com)**
