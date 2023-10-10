# Introduction

## Motivation

This library is *[very opinionated](./builder.md#concepts)*, it was built to consolidate recurring code patterns from *custom Blogger widgets* currently employed in *public-facing production blogs and widgets*.

Since it only serves a very specific use-case: *read-only posts fetching on Blogger blogs*, the library may come in handy when the excellent [Gapi](https://github.com/google/google-api-javascript-client) + [Blogger v3 api](https://developers.google.com/blogger/docs/3.0/reference) may be "too much" (e.g. a lightweight *preact / alpinejs widget*).

## How it works

At its core there is an [url builder](./builder.md) paired with a [client generator](./client.md) and some sensible Blogger defaults baked-in.

### Url builder `make()`

Wrapper around native URL interface, [more...](./builder.md#concepts)

* builds on top of the *native js URL interface*
* takes a fully typed config object made up of *Blogger params*
* validates each of them against *Blogger conventions*
* adds *defaults and normalizes* output for [consistency](./builder.md#url-consistency)
* returns a native js URL representing the resource

### `client()` generator

Async function generator, [more...](./client.md)

* builds on top of the native `fetch()` api
* can be used in a handy `for await ... of` loop
* *lazily loops* over all posts [starting from input](./builder.md#start-index)
* reuses Blogger's own [pagination features](./builder.md#max-results)
* returns a *fully-typed* feed or error object

## Disclaimer

This library is *not meant to replace GAPI client* and never will. It's just a different approach to fetch published posts in a *read-only scenario*.

It is neither affiliated or approved by [Google Blogger](https://www.blogger.com).
