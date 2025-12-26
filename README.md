# rsbuild-lit-markdown

Example plugin for Rsbuild.

<p>
  <a href="https://npmjs.com/package/rsbuild-lit-markdown">
    <img src="https://img.shields.io/npm/v/rsbuild-lit-markdown" alt="npm version" />
  </a>
  <a href="https://github.com/evg4b/rsbuild-lit-markdown/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="license" />
  </a>
  <a href="https://npmcharts.com/compare/rsbuild-lit-markdown?minimal=true">
    <img src="https://img.shields.io/npm/dm/rsbuild-lit-markdown.svg" alt="downloads" />
  </a>
</p>

## Usage

Install:

```bash
npm add rsbuild-lit-markdown -D
```

```bash
yarn add rsbuild-lit-markdown -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
import { litMarkdown } from "rsbuild-lit-markdown";

export default {
  plugins: [litMarkdown()],
};
```

Add types declaration to your `types.d.ts`:

```ts
declare module '*.md?lit' {
  import type { LitMarkdownFile } from 'rsbuild-lit-markdown';
  const file: LitMarkdownFile;
  export default file;
}
```


## Options


### foo


Some description.


- Type: `string`

- Default: `undefined`

- Example:


```js

litMarkdown({

  foo: "bar",

});

```

## License

[MIT](./LICENSE).
