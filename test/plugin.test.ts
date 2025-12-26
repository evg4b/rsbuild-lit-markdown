import { expect, test } from '@playwright/test';
import { createRsbuild } from '@rsbuild/core';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { litMarkdown } from '../src';
import { getRandomPort } from './helper';

test('should render page with plugin', async ({ page }) => {
  const rsbuild = await createRsbuild({
    cwd: import.meta.dirname,
    rsbuildConfig: {
      plugins: [
        litMarkdown({
          extensions: [gfmHeadingId({ prefix: 'test-' })],
        }),
      ],
      server: { port: getRandomPort() },
    },
  });

  const { server, urls } = await rsbuild.startDevServer();

  await page.goto(urls[0]);

  const h1Id = await page.evaluate(() => {
    const el = document.querySelector('my-element');
    return el?.shadowRoot?.querySelector('h1')?.id;
  });

  expect(h1Id).toBe('test-hello-markdown');

  await server.close();
});
