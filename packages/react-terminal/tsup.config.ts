import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    '.': 'src/index.tsx',
  },
  banner: {
    js: "'use client';",
  },
  sourcemap: true,
  splitting: true,
  injectStyle: true,
  treeshake: true,
  target: 'es2019',
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react'],
  dts: true,
});
