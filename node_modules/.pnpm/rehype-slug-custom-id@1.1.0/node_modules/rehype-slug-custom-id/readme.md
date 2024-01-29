# rehype-slug-custom-id

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[**rehype**][rehype] plugin to add `id`s to headings with the option for custom IDs.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install rehype-slug-custom-id
```

## Use

Say we have the following file, `fragment.html`:

```html
<h1>Lorem ipsum 😪</h1>
<h2>dolor—sit—amet</h2>
<h3>consectetur &amp; adipisicing</h3>
<h4>elit</h4>
<h5>elit</h5>
<h6>Custom ID Should Be Here {#custom-id}</h6>
```

And our script, `example.js`, looks as follows:

```js
import fs from 'node:fs'
import {rehype} from 'rehype'
import slug from 'rehype-slug'

const buf = fs.readFileSync('fragment.html')

rehype()
  .data('settings', {fragment: true})
  .use(slug)
  .process(buf)
  .then((file) => {
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
<h1 id="lorem-ipsum-">Lorem ipsum 😪</h1>
<h2 id="dolorsitamet">dolor—sit—amet</h2>
<h3 id="consectetur--adipisicing">consectetur &#x26; adipisicing</h3>
<h4 id="elit">elit</h4>
<h5 id="elit-1">elit</h5>
<h6 id="custom-id">Custom ID Should Be Here</h6>
```

## API

The default export is `rehypeSlug`.

### `unified().use(rehypeSlug)`

Add `id` properties to h1-h6 headings that don’t already have one.

Uses [**github-slugger**][ghslug] to create GitHub style `id`s, or a custom ID if supplied like so:

```html
<h1>ID {#custom-id-here}</h1>
```

We support the following options for the plugin:

*   `enableCustomId`: `Boolean`. Enable custom header IDs with {#id} (optional)
*   `maintainCase`: `Boolean`. Maintains the case for markdown header (optional)
*   `removeAccents`: `Boolean`. Remove accents from generated headings IDs (optional)

## Security

Use of `rehype-slug` can open you up to a [cross-site scripting (XSS)][xss]
attack as it sets `id` attributes on headings.
In a browser, elements are retrievable by `id` with JavaScript and CSS.
If a user injects a heading that slugs to an `id` you are already using,
the user content may impersonate the website.

Always be wary with user input and use [`rehype-sanitize`][sanitize].

## Related

*   [`rehype-slug`](https://github.com/rehypejs/rehype-slug)
    — Add slugs to headings in html
*   [`remark-slug`](https://github.com/wooorm/remark-slug)
    — Add slugs to headings in markdown
*   [`gatsby-remark-autolink-headers`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-autolink-headers)
    — Add slugs to headings in markdown for Gatsby

<!-- Definitions -->

[build-badge]: https://github.com/unicorn-utterances/rehype-slug-custom-id/workflows/main/badge.svg

[build]: https://github.com/unicorn-utterances/rehype-slug-custom-id/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/unicorn-utterances/rehype-slug-custom-id.svg

[coverage]: https://codecov.io/github/unicorn-utterances/rehype-slug-custom-id

[downloads-badge]: https://img.shields.io/npm/dm/rehype-slug-custom-id.svg

[downloads]: https://www.npmjs.com/package/rehype-slug-custom-id

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-slug-custom-id.svg

[size]: https://bundlephobia.com/result?p=rehype-slug-custom-id

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[rehype]: https://github.com/rehypejs/rehype

[ghslug]: https://github.com/Flet/github-slugger

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/rehypejs/rehype-sanitize
