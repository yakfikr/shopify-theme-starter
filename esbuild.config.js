import * as esbuild from 'esbuild';
import { globSync } from 'glob';

const isProduction = process.env.NODE_ENV === 'production';
const isWatch = process.argv.includes('--watch');

// store all root-level JS files
const entryPoints = globSync('js/*.js');

const config = {
  entryPoints,
  outdir: 'assets',
  bundle: true,
  minify: isProduction,
  sourcemap: false,
  target: 'es2024',
  format: 'esm',
  legalComments: isProduction ? 'none' : 'inline',
  // Don't bundle @theme/* imports - let browser resolve via import map
  external: ['@theme/idiomorph'],
};

if (isWatch) {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  console.log('\n👀 Watching JS files...');
} else {
  await esbuild.build(config);
  console.log('\n✓ JS build complete!');
}
