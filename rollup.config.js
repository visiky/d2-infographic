import { uglify } from 'rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import size from 'rollup-plugin-size';
import commonjs from '@rollup/plugin-commonjs';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/d2-infographic.min.js',
      name: 'D2Infographic',
      format: 'umd',
      sourcemap: false,
      globals: {
        '@antv/g2plot': 'G2Plot',
      },
    },
    external: ['@antv/g2plot'],
    plugins: [
      resolve(),
      typescript(),
      commonjs(),
      uglify(),
      size({}),
    ],
  },
];
