import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';

import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';


export default {
  entry: 'src/js/main.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    postcss({
      extensions: ['.css'],
      extract: 'build/css/main.min.css',
      plugins: [
        simplevars(),
        nested(),
        cssnext({
          warnForDuplicates: false,
        }),
        cssnano(),
      ],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true
    }),
    serve('build'),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};