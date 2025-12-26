# rsbuild-lit-markdown

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

[Rsbuild](httpss://rsbuild.dev/) plugin to import markdown files as [lit-html](httpss://lit.dev/docs/templates/overview/) template.

## Usage

1.  Install the plugin and its peer dependencies:

    ```bash
    npm i rsbuild-lit-markdown lit marked -D
    ```

2.  Add the plugin to your `rsbuild.config.ts`:

    ```ts
    import { litMarkdown } from 'rsbuild-lit-markdown';

    export default {
      plugins: [litMarkdown()],
    };
    ```

3. Add types declaration to your `types.d.ts`:

    ```ts
    declare module '*.md' {
      import type { LitMarkdownFile } from 'rsbuild-lit-markdown';
      export default LitMarkdownFile;
    }
    ```

4.  Import your markdown files:

    ```ts
    import { LitElement, html } from 'lit';
    import { customElement } from 'lit/decorators.js';
    import readme from './README.md';

    @customElement('example-readme')
    export class ReadmeElement extends LitElement {
      public override render() {
        return html`
          <div class="markdown">
            ${readme}
          </div>
        `;
      }
    }
    ```

## Configuration

### Marked options

You can pass options to the `litMarkdown` plugin. These options are passed directly to the `marked` library.
List of available options can be found [here](https://marked.js.org/using_advanced#options).

```ts
import { litMarkdown } from 'rsbuild-lit-markdown';

export default {
  plugins: [
    litMarkdown({
      gfm: true,
      // ... other marked options
    }),
  ],
};
```

### Custom file extension

You can also specify a custom file extension to match (do not forget to update your module declaration):

```ts
import { litMarkdown } from 'rsbuild-lit-markdown';

export default {
  plugins: [
    litMarkdown({
      selector: /\.mdx?$/,
    }),
  ],
};
```

### Markdown extensions
You can add custom markdown extensions by providing an array of extensions to the `extensions` option:

```ts
import { litMarkdown } from 'rsbuild-lit-markdown';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

export default {
  plugins: [
    litMarkdown({
      extensions: [
        markedHighlight({
          langPrefix: 'hljs language-',
          highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
          }
        })
      ]
    }),
  ],
};
```

## License

This project is licensed under the [MIT License](./LICENSE).