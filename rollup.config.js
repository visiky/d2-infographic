// import { uglify } from 'rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import size from 'rollup-plugin-size';
import commonjs from '@rollup/plugin-commonjs'

module.exports = [{
  input: 'src/index.ts',
  output: {
    file: 'dist/g2plot-infographic.min.js',
    name: 'D2Infographic',
    format: 'umd',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript(),
    commonjs(),
    // todo https://www.jianshu.com/p/4c66db0d7a7d
    // uglify(),
    size({}),
  ],
}];
