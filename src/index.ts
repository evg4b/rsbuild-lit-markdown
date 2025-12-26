import type { RsbuildPlugin, RsbuildPluginAPI } from '@rsbuild/core';
import type { html } from 'lit';
import { type MarkedExtension, type MarkedOptions, marked } from 'marked';

export type LitMarkdownFile = ReturnType<typeof html>;

export interface LitMarkdownOptions extends MarkedOptions {
  selector?: RegExp;
  use?: MarkedExtension[];
}

export const litMarkdown = (
  options: LitMarkdownOptions = {},
): RsbuildPlugin => ({
  name: 'plugin-lit-markdown',
  setup(api: RsbuildPluginAPI) {
    Array.from(options.use || []).forEach((extension) => {
      marked.use(extension);
      api.logger.debug('Loaded extension', extension);
    });

    api.transform(
      { test: options.selector ?? /\.md?lit$/, order: 'pre' },
      async (context) => {
        api.logger.debug('transforming', context.resource);

        const html = await marked(context.code, options);
        const encoded = html.replace('`', '\\`');

        api.logger.debug('transforming', context.resource);

        return `import { html } from "lit"; export default html\`${encoded}\`;`;
      },
    );
  },
});
