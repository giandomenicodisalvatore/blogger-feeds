---
layout: home

hero:
  name: blogger-feeds
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
  - title: Blogger conventions
    icon: 🤝
    details: Validates parameters against blogger conventions adhering to the same naming
  - title: Url consistency
    icon: 🔗
    details: Url params are as explicit and consistent as possible, for better cache matching
  - title: Lazy client
    icon: 📡
    details: An async generator that prevents over-fetching with blogger's own pagination built-in
  - title: Simplified feeds
    icon: 🍒
    details: You may cherry-pick the props to keep in the fetched feeds object, ignoring the rest
  - title: Extra helpers
    icon: 🃏
    details: Functions to simplify working with blogger and youtube thumbnail urls or date params
  - title: No dependencies
    icon: 👌
    details: All exports are simple wrappers around native js URL interface and fetch api
  - title: Tree-shakeable
    icon: 🌳
    details: You may just import what you need and tree-shake the rest with your preferred bundler
  - title: Fully typed
    icon: 💪
    details: Rebuilt from the ground up in typescript, even client feeds and errors are typed
---