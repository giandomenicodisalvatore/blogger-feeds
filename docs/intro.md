# Introduction

This library is **very opinionated**, it was built to consolidate recurring code patterns from **custom Blogger widgets** currently employed in **public-facing production blogs**.

## Motivation

The library only serves a very specific use-case: **read-only posts fetching on Blogger blogs**.

It may come handy when the excellent [Gapi](https://github.com/google/google-api-javascript-client) + [Blogger v3 api](https://developers.google.com/blogger/docs/3.0/reference) may be "overkill", in example when building a lightweight *preact / alpinejs widget*.

## How it works

At its core there is an url builder paired with a wrapping client and some sensible Blogger platform defaults built-in.

### Url builder: `make()`

Wrapper around native URL interface

* builds on top of the **native js URL interface**
* takes a fully typed config object made up of **blogger params**
* validates each each parameter against **Blogger conventions**
* adds **blogger defaults** to make them fully explicit
* normalizes the url for better cache matching and consistency
* returns a native js URL to the requested resource

[Usage and examples](./builder.md)

### Async generator: `client()`

Async function generator

* builds on top of the **native `fetch()` api**
* can be used in a handy **`for await ... of` loop**
* **lazily loops** over all posts starting from input
* reuses Blogger's own pagination features
* returns a **fully-typed feed object** (caveat)
* or a fully transparent error object

[Usage and examples](./client.md)

## Disclaimer

It is **not meant to replace GAPI client** and never will be. Instead, it's a different approach to fetch published posts in a **read-only scenario**, heavily inspired by Blogger's own dynamic templates.

**The library is neither affiliated or approved by [Google Blogger](https://www.blogger.com)**.
