// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';

import tailwind from '@astrojs/tailwind';

// import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind()]
});