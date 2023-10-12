---
prev: false
next: false
---

<script setup>
import { make, merge } from "@lib/url";
import { thumb } from "@lib/client";

const blog = import.meta.env.VITE_BLOG

const RawFeedsUrl = make({ blog })

const PostCountUrl = make({
  'max-results': 1,
  blog,
})

const LastPublishedUrl = PostCountUrl

const LastUpdatedUrl = merge(PostCountUrl, {
    orderby: 'updated'
})

const MaxCollectionSize = make({
  'max-results': 150,
  blog,
})

// same as helpers thumb()
const OriginalImage = "https://4.bp.blogspot.com/-k1bwGQauV6I/WLyURMAuU9I/AAAAAAAAAD0/k_ZcX4sr_bENoB2P3P8MTEfN-ymfa3_ugCLcB/s0/en_Contempo.jpg"

const ResizedImage = thumb(OriginalImage, 300)
</script>

# Examples

A collection of patterns extracted from blogs and custom widgets implementations that [inspired the library](./intro.md#motivation) that haven't been covered in the [url builder](./builder.md) or [helpers](./helpers.md) pages.

You may even pass the `client()` the same example configs found in the [`make()` examples](./builder.md), leveraging the shared api via `make` param (and vice versa).

Again we will refer to [Blogger Team's blog](https://blogger.googleblog.com) and, since we can't prevent [CORS issues](./client.md#custom-domain), instead of fetching we will link to the raw resources.

<<< @/.env{bash}

## Posts count

``` js
const generator = client({
  make: {
    blog: 'https://www.my-blogger.com',
    'max-results': 1, // reduced payload
  },
  // keep only the relevant data
  keep: ['total', 'start-index']
})

const { meta } = (await generator.next()).value

// may be computed from any non paginated requests
const PostCount = meta.total + meta['start-index']

const PostCountUrl = make({
    blog: 'https://blogger.googleblog.com',
    'max-results': 1, // reduced payload
})
```

* <a text="PostCountUrl" :href="PostCountUrl" target="_blank" rel="nofollow,noopener" />

## Last published / updated

``` js
const generator = client({
  make: {
    blog: 'https://blogger.googleblog.com',
    orderby: 'published', // or 'updated'
    'max-results': 1, // reduced payload
    'start-index': 1, // only the first
  },
})

const { data } = (await generator.next()).value

// the latest post
const Post = data.at(0)
// its timestamps
const { published, updated } = Post

const LastPublishedUrl = make({
  blog: 'https://blogger.googleblog.com',
  orderby: 'published',
  'max-results': 1,
  'start-index': 1,
})

const LastUpdatedUrl = merge(LastPublishedUrl, { 
  orderby: 'updated'
})
```

* <a text="LastPublishedUrl" :href="LastPublishedUrl" target="_blank" rel="nofollow,noopener" />
* <a text="LastUpdatedUrl" :href="LastUpdatedUrl" target="_blank" rel="nofollow,noopener" />

## List all `labels`

No need to use the client, since all published [`labels`](./builder.md#labels-filter) are nested in the raw feeds under `feed.categories[]`.

``` js
const RawFeedsUrl = make({
  blog: 'https://blogger.googleblog.com'
})

const response = await fetch(RawFeedsUrl)
const data = await response.json()

const AllLabels = data.feed.category.map(cat => cat.term)
```

* <a text="RawFeedsUrl" :href="RawFeedsUrl" target="_blank" rel="nofollow,noopener" />

## List all posts

``` js
const generator = client({
  make: {
    blog: 'https://blogger.googleblog.com',
    // reduce api calls needed to fetch all posts
    'max-results': 150,
  },
  // just the titles and links to the public urls
  keep: ['title', 'href']
})

const AllPosts = []

for await (const collection of generator) 
  if (collection.type === 'data') 
    AllPosts.concat(collection.data)

const MaxCollectionSize = make({
  blog: 'https://blogger.googleblog.com',
  'max-results': 150,
})
```

* <a text="MaxCollectionSize" :href="MaxCollectionSize" target="_blank" rel="nofollow,noopener" /> (refer to [`max-results`](./builder.md#max-results))

## Resized post image

``` js
// assuming we already know the postId
const generator = client({
  make: {
    blog: 'https://blogger.googleblog.com',
    postId: '2731320382187546485',
  },
  keep: ['image']
})

const { data } = (await generator.next()).value

const OriginalImage = data.at(0).image

const ResizedImage = thumb(OriginalImage, 200)
```

<a :href="OriginalImage" text="OriginalImage (size 1600)" />, original thumbnail from Google Blogger's [blog post](https://blogger.googleblog.com/2017/03/share-your-unique-style-with-new.html)

<div class="flex flex-col text-center gap-3">
  <div class="mx-auto">
    <img :src="OriginalImage" />
    <a :href="OriginalImage" text="OriginalImage" target="_blank" />
  </div>
  <div class="mx-auto">
    <img :src="ResizedImage" />
    <a :href="ResizedImage" text="ResizedImage" target="_blank" />
  </div>
</div>