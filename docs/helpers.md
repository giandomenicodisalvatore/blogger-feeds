---
prev: {text: Client generator, link: ./client}
next: false
---

<script setup>
import { thumb, ytimg, isoDate, make, merge } from '@lib'
import { useIntervalFn } from '@vueuse/core'
import { onMounted, ref } from 'vue'

// image  thumbnails

const exampleImg = 'https://4.bp.blogspot.com/-k1bwGQauV6I/WLyURMAuU9I/AAAAAAAAAD0/k_ZcX4sr_bENoB2P3P8MTEfN-ymfa3_ugCLcB/s1600/en_Contempo.jpg'

const size200 = thumb(exampleImg, 200)

const size400 = thumb(exampleImg, 400)

const exampleVid = 'https://www.youtube.com/watch?v=M7QMTRlzkt0'

const ytHQImage = ytimg(exampleVid)

const ytMQImage = ytimg(exampleVid, {
  quality: 'mq'
})

const ytAllImages = ytimg(exampleVid, {
  all: true
})

console.table(ytAllImages)

// date examples

const bloggerDate = ref('')

useIntervalFn(() => {
  bloggerDate.value = isoDate(new Date)
}, 1000)

// url examples

// Blogger team's blog 💖
const blog = new URL("https://blogger.googleblog.com")

// Last post 📰
// https://blogger.googleblog.com/2020/05/a-better-blogger-experience-on-web.html
const postId= "7531385161213212970"

// valid Blogger feeds url
const PaginatedMax = make({
  "max-results": 150,
  blog,
 })

// this will allow to fetch one by one
const LastUpdated = merge(PaginatedMax, {
  orderby: "updated",
  "max-results": 1,
})

// this will revert to defaults
const PaginatedDefault = merge(PaginatedMax,LastUpdated, {
  "max-results": "",
  orderby: "",
})

// works with any params
const SinglePost = merge(PaginatedMax, {
  postId,
})
</script>

# Helpers

You shouldn't need any of these helpers when using the `client()`, since it already takes care of any needs by itself. But, if you are trying to fetch raw feeds from blogspot, these internal helpers may come in handy when:

* editing or merging Blogger urls
* passing Blogger-compatible date params
* getting the url to a resized Blogger thumbnail
* getting the url to the default YouTube thumbnail

To further tree-shake your bundle size you may import any helper from `blogger-feeds/helpers`.

## `merge()`

Merges blogger feeds urls or configs. Right-most parameters take precedence and overwrite le left-most ones. To delete or reset a parameter you may pass null or empty string.

``` js
import { make, merge } from "blogger-feeds"

// Blogger team's blog 💖
const blog = new URL("https://blogger.googleblog.com")

// Last post 📰
// https://blogger.googleblog.com/2020/05/a-better-blogger-experience-on-web.html
const postId= "7531385161213212970"

// valid Blogger feeds url
const PaginatedMax = make({
  "max-results": 150,
  blog,
 })

// this will allow to fetch one by one
const LastUpdated = merge(PaginatedMax, {
  orderby: "updated",
  "max-results": 1,
})

// this will revert to defaults
const PaginatedDefault = merge(PaginatedMax,LastUpdated, {
  "max-results": "",
  orderby: "", 
})

// works with any params
const SinglePost = merge(PaginatedMax, {
  postId,
})
```

Check out the data (if you try to fetch you may incur into [CORS issues](./get-started.md#requirements)):

<ul>
  <li>
    <a :href="PaginatedMax" text="PaginatedMax" target="_blank" />
  </li>
  <li>
    <a :href="LastUpdated" text="LastUpdated" target="_blank" />
  </li>
  <li>
    <a :href="PaginatedDefault" text="PaginatedDefault" target="_blank" />
  </li>
  <li>
    <a :href="SinglePost" text="SinglePost" target="_blank" />
  </li>
</ul>

## `isoDate()`

This function is not a real ISO date function, but a fault-tolerant date formatter coercing any valid date input into a Blogger-compatible string:

* date string
* empty string

Though not recommended, timezone is supported. Please consider that any valid date value you pass to Blogger may be considered as an UTC date.

``` js
import { isoDate } from "blogger-feeds/helpers"

// any value will be parsed via new Date
console.log(isoDate("2023-01-01")) // "2023-01-01T00:00:00"

// invalid values will return empty string
console.log(isoDate("invalid_value")) // ""
console.log(!!isoDate("invalid_value")) // false
```

Blogger date: {{ bloggerDate }}

## `thumb()`

Remaps a Blogger image url to the url for a resized thumbnail version, using Blogger images api.

Defaults to original image size, also when passed size 0.

``` js
import { thumb } from "blogger-feeds/helpers"

// thumbnail from Google Blogger's blog post:
// https://blogger.googleblog.com/2017/03/share-your-unique-style-with-new.html
const exampleImg = "https://4.bp.blogspot.com/-k1bwGQauV6I/WLyURMAuU9I/AAAAAAAAAD0/k_ZcX4sr_bENoB2P3P8MTEfN-ymfa3_ugCLcB/s1600/en_Contempo.jpg"

const size200 = thumb(exampleImg, 200)

const size400 = thumb(exampleImg, 400)
```

<a :href="exampleImg" text="exampleImg (size 1600)" />, original thumbnail from Google Blogger's [blog post](https://blogger.googleblog.com/2017/03/share-your-unique-style-with-new.html)

<div class="flex flex-col text-center gap-3">
  <div class="mx-auto">
    <img :src="size400" />
    <a :href="size400" text="size400" target="_blank" />
  </div>
  <div class="mx-auto">
    <img :src="size200" />
    <a :href="size200" text="size200" target="_blank" />
  </div>
</div>

## `ytimg()`

Given any valid YouTube image thumbnail or video id, the function remaps it to the associated high quality default thumbnail or to the according passed options.

Implemented according to [this stackoverflow answer](https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api), since no other format is guaranteed to always exist, the function defaults to the video background image.

If you pass `{all: true}` you will get back a dictionary of all possible urls, but please remember that no other formats than the default is guaranteed to exist.

``` js
import { ytimg } from "blogger-feeds/helpers"

// Pensiero e tormento - Ivan Yonkov, Giandomenico di Salvatore
const exampleVid = "https://www.youtube.com/watch?v=M7QMTRlzkt0"

const ytHQImage = ytimg (exampleVid)

const ytMQImage = ytimg(exampleVid, { quality: 'mq' })


const ytAllImages = ytimg(exampleVid, {
  all: true
})

// open dev console
console.table(ytAllImages) 
```

<a :href="exampleVid" text="exampleVid" />, Pensiero e tormento - Ivan Yonkov, Giandomenico di Salvatore ([youtube link](https://www.youtube.com/watch?v=M7QMTRlzkt0))

<div class="flex flex-col text-center gap-3">
  <div class="mx-auto">
    <img :src="ytHQImage" />
    <a :href="ytHQImage" text="ytHQImage" target="_blank" />
  </div>
  <div class="mx-auto">
    <img :src="ytMQImage" />
    <a :href="ytMQImage" text="ytMQImage" target="_blank" />
  </div>
</div>
