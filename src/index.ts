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
    api.transform(
      { test: options.selector ?? /\.md$/, order: 'pre' },
      async (context) => {
        api.logger.debug('transforming', context.resource);

        const html = await marked(context.code, options as MarkedOptions);
        const encoded = html.replace('`', '\\`');

        api.logger.debug('transforming', context.resource);

        return `import { html } from "lit"; export default html\`${encoded}\`;`;
      },
    );
  },
});
