import { defineConfig } from '@rsbuild/core';
import { litMarkdown } from '../src';

export default defineConfig({
  plugins: [litMarkdown()],
});
