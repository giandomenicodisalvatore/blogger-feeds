---
layout: home

hero:
  name: "blogger-feeds"
  image: ./blogger-feeds-logo.svg
  tagline: Read-only utilities and client for Blogger feeds
  actions:
    - theme: brand
      text: Get started
      link: /get-started
    - theme: alt
      text: Examples
      link: /examples

features:
  - title: Platform conventions
    details: Validates against blogger conventions, reusing even the same naming
  - title: Url consistency
    details: Url params are as explicit and consistent as possible, for better cache matching
  - title: Lazy client
    details: An async generator function to avoid over-fetching, sensible platform pagination built-in
  - title: Simplified feeds
    details: You may cherry-pick the props to keep in the fetched feeds, ignore the rest
  - title: Extra utilities
    details: Allowing you to work with blogger and youtube thumbnails or iso dates
  - title: No dependencies
    details: All exports are simple wrappers around native js URL interface and fetch api
  - title: Tree-shakeable
    details: You may just import what you need and tree-shake the rest with your preferred bundler
  - title: Fully typed
    details: Rebuilt from the ground up with typescript, even client feeds and errors are typed
---
