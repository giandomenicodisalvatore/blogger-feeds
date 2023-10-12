---
prev: {text: Get started, link: ./get-started}
next: {text: Client generator, link: ./client}
---

<script setup>
import { make } from "@lib/url"

const DefaultPaginated = make({
  blog: 'https://blogger.googleblog.com'
})

const BloggerPaginated = make({
  blog: 'blogger',  
  blogId: '2399953',
})

const SinglePost = make({
  blog: new URL('https://blogger.googleblog.com'),
  postId: '7531385161213212970',
})

const BloggerSinglePost = make({
  blog: 'blogger',
  blogId: '2399953',
  postId: '7531385161213212970',
})

const PaginatedBy47 = make({
  blog: 'https://blogger.googleblog.com',
  'max-results': 47,
})

const StartFrom47 = make({
  blog: 'https://blogger.googleblog.com',
  'start-index': 47,
})

const LastUpdated = make({
  blog: 'https://blogger.googleblog.com',
  'orderby': 'updated',
  'max-results': 1,
})

const BackTo2020 = make({
  blog: 'https://blogger.googleblog.com',
  'published-min': '01-01-2020',
  'published-max': '31-12-2020',
})

const LabeledYouTube = make({
  blog: 'https://blogger.googleblog.com',
  labels: ['youtube'],
})

const LabeledYoutubeSubset = make({
  blog: 'https://blogger.googleblog.com',
  labels: [['youtube','subset']],
})

const SearchForHelp = make({
  blog: 'https://blogger.googleblog.com',
  terms: 'help',
})
</script>

# Url Builder `make()`

A very simple wrapper over [native URL interface](./intro.md#url-builder-make) to easily create valid blogger urls that strives to be as close as possible to Blogger's own naming convention and defaults, except for a [few handy differences](#search-and-labeled-posts).

Throughout the examples we will refer to [Blogger Team's blog](https://blogger.googleblog.com).

<<< @/.env{bash}

## Concepts

### Blogger conventions

Most of these defaults and conventions have been inferred through *trial-and-error* while coding custom widgets. As such *they may differ* from the *actual* Blogger implementation.

### Custom domains vs blogger.com

[`blog` parameter](#blog) is always required and must be a valid URL. You may also pass [`'blogger'`](#blogid) to setup the url structure according to *blogger.com*

Blogger url structure changes according to the blog domain, this is mainly reflected on single post feeds: to reach the same resource you may notice *slightly different paths* between a blogger.com blog and your own [custom domain](./get-started.md#custom-domain).

### Single post vs paginated collections

A valid `postId` causes the builder to always return a valid single post feed url and *ignore all other params* to avoid blogger errors, in other words:

* a valid `postId` represents a [single post](#postid) resource
* otherwise the url will point to a [paginated collection](#max-results)

This behavior is also reflected and relied upon in the [`client()` generator](./client.md)

### Search `terms` and `labels`

Blogger uses the same `?q=` search parameter to ~~query~~ *filter* posts feeds both by [search terms](#terms-search) and [labels](#labels-filter). In order to simplify the api, `terms` and `labels` params are split: `make()` function will process and merge them according to Blogger conventions.

### Url consistency

There are many possible urls to represent the same feed resource, especially in returned raw feeds, eventually causing cache mismatches. For this reason `make()` is a *deterministic function* that automatically adds some *sensible default and implicit params*.

These latter have proved to be critical for both url and content *consistency*:

* `rewriteforssl=true`
* `dynamicviews=1`
* `alt=json`
* `v=2`

## `blog` *

*Always* required, must be a *valid url* or `'blogger'` string

``` js
const DefaultPaginated = make({
  // Blogger team's blog 💖
  blog: new URL('https://blogger.googleblog.com')
  // also adds default parameters
  // orderby: 'published',
  // 'max-results': 25,
  // 'start-index': 1,
})
```

* <a text="DefaultPaginated" :href="DefaultPaginated" target="_blank" rel="nofollow,noopener" />

## `blogId` *

Only required when passing `'blogger'` string, every resource url has an equivalent backend *blogger.com* location.

``` js
const BloggerPaginated = make({
  // blog: new URL('https://blogger.googleblog.com')
  blog: 'blogger',
  // Blogger team's blog id 💖
  blogId: '2399953',
})
```

* <a text="BloggerPaginated" :href="BloggerPaginated" target="_blank" rel="nofollow,noopener" />

## `postId` *

Only required for *single posts*, must be a string of at least 7 characters (`/\d{7,}/`). If valid, every other param is ignored.

``` js
// A post from Blogger team 📰
const SinglePost = make({
  blog: new URL('https://blogger.googleblog.com'),
  postId: '7531385161213212970',
  // ignores the rest...
})

// blogger.com equivalent url
const BloggerSinglePost = make({
  blog: 'blogger',
  blogId: '2399953',
  postId: '7531385161213212970',
})
```

* Example post: <a text="A better Blogger experience on the web" href="https://blogger.googleblog.com/2020/05/a-better-blogger-experience-on-web.html" target="_blank" rel="nofollow,noopener" />
* <a text="BloggerSinglePost" :href="BloggerSinglePost" target="_blank" rel="nofollow,noopener" />
* <a text="SinglePost" :href="SinglePost" target="_blank" rel="nofollow,noopener" />

## `max-results`

Controls pagination size. Defaults to `25`, Blogger's own default. Its value is clamped between `1` and `150`.

```js
const PaginatedBy47 = make({
  blog: 'https://blogger.googleblog.com',
  // because it's a prime number 😇
  'max-results': 47,
})
```

* <a text="PaginatedBy47" :href="PaginatedBy47" target="_blank" rel="nofollow,noopener" />

## `start-index`

Controls pagination offset. Defaults to `1`, Blogger's own default.

```js
const StartFrom47 = make({
  blog: 'https://blogger.googleblog.com',
  // it's still a prime number 🙂
  'start-index': 47,
})
```

* <a text="StartFrom47" :href="StartFrom47" target="_blank" rel="nofollow,noopener" />

## `orderby`

Controls collections order. Defaults to `published`, Blogger's own default. It only allows sorting posts by `published` or `updated` in descending order.

```js
const LastUpdated = make({
  blog: 'https://blogger.googleblog.com',
  // sorted in descending order
  'orderby': 'updated',
  // only the last post
  'max-results': 1,
})
```

* <a text="LastUpdated" :href="LastUpdated" target="_blank" rel="nofollow,noopener" />

## date filters

* `published-max`
* `published-min`
* `updated-max`
* `updated-min`

Quite intuitively, these parameters allow *filtering posts collection by date*. You may pass any valid *date-parsable value* or a `new Date` object. Under the hood the value is coerced to a *Blogger-compatible date string* by [`isoDate()`](/helpers.html#isodate).

```js
const BackTo2020 = make({
  blog: 'https://blogger.googleblog.com',
  // only get posts from 2020...
  'published-min': '01-01-2020',
  'published-max': '31-12-2020',
})
```

* <a text="BackTo2020" :href="BackTo2020" target="_blank" rel="nofollow,noopener" />

## `labels` filter

[Merged with search terms](#search-terms-and-labels), it allows *filtering posts collection by labels* passing an array where:

* `string` elements are treated as single labels (OR operation)
* `string[]` elements are joined together (AND operation)

```js
const LabeledYouTube = make({
  blog: 'https://blogger.googleblog.com',
  // only get posts labeled youtube...
  labels: ['youtube'],
})

const LabeledYoutubeSubset = make({
  blog: 'https://blogger.googleblog.com',
  // posts with both youtube AND subset labels
  // no posts exist with subset label
  labels: [['youtube','subset']],
})
```

* <a text="LabeledYouTube" :href="LabeledYouTube" target="_blank" rel="nofollow,noopener" />
* <a text="LabeledYoutubeSubset" :href="LabeledYoutubeSubset" target="_blank" rel="nofollow,noopener" />

## search `terms`

[Merged with labels](#search-terms-and-labels), it allows *filtering posts collection by search terms*. It expects a non-empty string, otherwise it gets ignored.

```js
const SearchForHelp = make({
  blog: 'https://blogger.googleblog.com',
  // posts about getting help on Blogger
  terms: 'help',
})
```

* <a text="SearchForHelp" :href="SearchForHelp" target="_blank" rel="nofollow,noopener" />
