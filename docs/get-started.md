# Get started

## Requirements

The url builder `make()` works by itself in any environment.

While the `client()` generator may work with no additional configuration on a Blogger page, since it **correctly** enforces strict [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), you are most likely to incur into **CORS issues** when using the library in any other environment (like node, lambda functions...).

### Custom domain

In order to **avoid said issues**:

1. Blogger should be served through a **custom domain**
2. that domain should **send proper [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)**

To achieve this setup I am currently using [Cloudflare free plan](https://www.cloudflare.com/plans/free), but any other solution is equally viable, as long as it allows to setup **your own headers**.

## Installation

### npm

``` bash
pnpm i blogger-feeds
```

### cdn

``` html
<script type="module">
import { make } from "https://cdn.jsdelivr.net/npm/blogger-feeds@latest/core"
// ...
</script>
```

## Exports

You may import just what you need to further tree-shake the bundle size

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

## Usage

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
