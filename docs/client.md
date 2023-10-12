---
prev: {text: Url builder, link: ./builder}
next: {text: Extra helpers, link: ./helpers}
---

# `client()` generator

A simple wrapper over the [native `fetch()` api](./intro.md#client-generator) that *fetches and processes* raw post data from Blogger feeds leveraging [url builder concepts](./builder.md#concepts).

## Requirements

While the `client()` generator may work out of the box on a Blogger page, since the platform *correctly* enforces strict [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) you are most likely to incur into *CORS issues* when using it in any other environment (like node, lambda functions...).

### Custom domain

In order to *avoid* the aforementioned issues:

1. the blog should be open to the public
2. it should be served through a *custom domain*
3. that domain should *send proper [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)*

To achieve this setup I am currently using [Cloudflare free plan](https://www.cloudflare.com/plans/free), but any other solution is equally viable as long as it allows you to setup *your own CORS headers*.

### Sanitization

CAVEAT: *No sanitization is applied to any content returned from Blogger feeds*. Please make sure to *sanitize any html* using an adequate library (like [dom-purify](https://github.com/cure53/DOMPurify), [sanitize-html](https://github.com/apostrophecms/sanitize-html), [js-xss](https://jsxss.com/en/index.html)...)

## Concepts

### Async function generator

The `client()` is an [async function generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*) because it is meant to be called in a handy [for-await-of loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) that can handle all published posts like a *"paginated stack"*. This choice entails several conspicuous advantages in a small widget scenario:

* better readability and brevity over alternative approaches
* lazy evaluation and resumable processing, no over-fetching
* memory efficiency on both client and platform side
* improved control over the asynchronous flow
* abortability via native [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
* easier error handling

### `Feed` object vs raw data

CAVEAT: the `Feed` object returned from the `client()` generator *is not* the same as raw feeds data returned from Blogger feeds urls.

It is instead an *opinionated subset* of the most relevant data, processed and presented under a *unified api*. The main reason being some notable improvements:

* simplified, predictable and fully typed props
* coherent and consistent resource urls
* simpler and meaningful naming

### Cherry-picking props

Since every step is evaluated *as lazily as possible* you may cherry-pick the props you want to keep, but you may not exclude the following mission-critical `Feed.meta` props, which are always provided:

* [`blog`](./builder.md#blog), [`blogId`](./builder.md#blogid), [`postId`](./builder.md#postid)
* `next`, client-specific flag

## Usage

* `make`, the only required param, shares the same api as the [url builder make()](./builder.md)
* `opt` shares the same api as [Request interface](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options), passed directly to the internal `fetch()` function
* `keep` specifies the [props to keep](#cherry-picking-props), defaults to `'*'` (all)
* `from` shares the same api as the [`merge()` helper](./helpers.md#merge)

When provided, `from` param represents a *base url to update* using `make` config, thus it may even be a valid url string.

``` js
import { client } from 'blogger-feeds'

// you may abort at any time
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

## `FeedData`

While `type` is just a flag to help typescript infer the correct return type between an `error` or `data` object and `data` just holds an ordered array of the fetched posts, the most interesting data is nested inside `meta`.

Besides the shared props with the [url builder](./builder.md#concepts), `Feed.meta` also shows some interesting information the performed request:

* the request url itself, the public resource uri
* [pagination size](./builder.md#max-results), items left and [offset](./builder.md#start-index)
* next available request

``` ts
type FeedData = {
  // ts infer helper
  type: 'data',
  
  // info about the request
  'meta': {
    // always computed
    blog: string | 'blogger',
    blogId: string,
    postId: null,

    // performed request url
    self: string,

    // single posts only, url to the public blog
    href: string | null, 

    // pagination only, otherwise null
    next: string | null // next available request
    total: number | null, // remaining items
    'start-index': number | null, // offset
    'max-results': number | null, // page size

    // optional
    updated: string, // blogger date
    etag: string, // for cache purposes
  },

  // the actual fetched posts
  data: Post[]
}
```

## `FeedPost`

Quite intuitively, only on [single post requests](./builder.md#single-post-vs-paginated-collections), `meta`'s `postId`, `href`, `self`, `updated` and `etag` correspond to the post's own data.

``` ts
type FeedPost = {
  // always computed, the rest is optional
  self: string, // pre-calculated url to the single post feed
  postId: string, // for completeness

  // post meta
  title: string,
  href: string, // url to the public blog
  authors: string[], // blogger nicknames
  categories: string[] // assigned labels
  
  // blogger dates
  published: string,
  updated: string,
  
  // for cache purposes
  etag: string,

  // url to the full-size thumbnail
  image: string,
  
  // post content
  type: 'html' | string,
  // remember to sanitize Post.body!
  body: string,
}
```

## `FeedError`

Should something go wrong at any level, the `client()` stops and transparently returns a useful `Error` object for debugging purposes.

* `type` is a flag to help typescript, same as `FeedData.type`
* `err` holds the actual error object as-is
* `conf` is a copy of the initial configuration object
* `req` is the actual request computed, complete with `conf.opt`
* `res` is the actual raw, unprocessed feed data returned from Blogger

``` ts
type FeedError = {
  type: 'error'
  err: Error | ErrorEvent
  conf: FetchConf
  req?: Request
  res?: Response
}
```
