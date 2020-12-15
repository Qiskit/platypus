const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const rename = require('gulp-rename');

const vue = require('rollup-plugin-vue');
const typescript = require('rollup-plugin-typescript');
const replace = require('rollup-plugin-replace');
const {nodeResolve} = require('@rollup/plugin-node-resolve');

function build() {
  return gulp.src(['components/components.js'])
      .pipe(rollup({plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
        vue({
          compileTemplate: true,
          style: {
            preprocessOptions: {
              scss: {
                includePaths: ['node_modules'],
                implementation: require('node-sass'),
                data: '@import "components/scss/mq.scss"; @import "components/scss/mixins.scss";'
              }
            }
          }
        }),
        nodeResolve(),
        typescript()]},
                   {format: 'iife'}))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('build'));
}

exports.default = gulp.parallel(build)
