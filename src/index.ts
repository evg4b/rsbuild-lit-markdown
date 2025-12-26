import type { RsbuildPlugin, RsbuildPluginAPI } from '@rsbuild/core';
import type { html } from 'lit';
import { type MarkedExtension, type MarkedOptions, marked } from 'marked';

export type LitMarkdownFile = ReturnType<typeof html>;

export interface LitMarkdownOptions extends Omit<MarkedOptions, 'extensions'> {
  selector?: RegExp;
  extensions?: MarkedExtension[];
}

export const litMarkdown = (
  options: LitMarkdownOptions = {},
): RsbuildPlugin => ({
  name: 'plugin-lit-markdown',
  setup(api: RsbuildPluginAPI) {
    const { extensions, selector, ...markedOptions } = options;

    for (const extension of extensions ?? []) {
      api.logger.debug('registering extension', extension);
      marked.use(extension);
    }

    api.transform(
      { test: selector ?? /\.md$/, order: 'pre' },
      async (context) => {
        api.logger.debug('transforming', context.resource);

        const html = await marked(context.code, markedOptions);
        const encoded = html.replace('`', '\\`');

        api.logger.debug('transforming', context.resource);

        return `import { html } from "lit"; export default html\`${encoded}\`;`;
      },
    );
  },
});
