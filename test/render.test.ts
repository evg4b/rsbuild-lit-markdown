import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { createRsbuild } from '@rsbuild/core';
import { litMarkdown } from '../src';
import { getRandomPort } from './helper';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('should render page as expected', async ({ page }) => {
  const rsbuild = await createRsbuild({
    cwd: __dirname,
    rsbuildConfig: {
      plugins: [litMarkdown()],
      server: { port: getRandomPort() },
    },
  });

  const { server, urls } = await rsbuild.startDevServer();

  await page.goto(urls[0]);

  const getSelector = (selector: string) =>
    page.evaluate((selector) => {
      const el = document.querySelector('my-element');
      return el?.shadowRoot?.querySelector(selector)?.textContent?.trim();
    }, selector);

  const h1 = await getSelector('h1');
  const p = await getSelector('p');
  const pre = await getSelector('pre');

  expect(h1).toBe('Hello Markdown!');
  expect(p).toBe('Hello World!');
  expect(pre).toBe("console.log('Hello TypeScript!');");

  await server.close();
});
