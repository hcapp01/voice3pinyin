import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'lucide-react'],
  treeshake: true,
  injectStyle: true,
  loader: {
    '.css': 'css',
  },
});