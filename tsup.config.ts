import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  splitting: false,
  treeshake: true,
  external: ['react', 'react-native'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";'
    }
  }
})
