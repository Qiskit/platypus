// =============================================================================
// Qiskit Gulpfile
// =============================================================================


const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

const {nodeResolve} = require('@rollup/plugin-node-resolve');
const typescript = require('rollup-plugin-typescript');
const autoprefixer = require('autoprefixer');
const textbooks = require('@mathigon/parser').gulp;


function markdown() {
  return gulp.src(['content/*/', '!content/shared/'])
      .pipe(textbooks(['en'], __dirname + '/build/.cache.json'))
      .pipe(gulp.dest('build'));
}

function scripts() {
  return gulp.src(['content/*/*.ts', '!content/shared/**'])
      .pipe(rollup({plugins: [nodeResolve(), typescript()],},
                   {format: 'iife', name: 'StepFunctions'}))
      .pipe(rename({extname: '.js'}))
      .pipe(gulp.dest('build'));
}

function stylesheets() {
  return gulp.src(['content/*/*.less', '!content/shared/**'])
      .pipe(less())
      .pipe(postcss([autoprefixer()]))
      .pipe(rename({extname: '.css'}))
      .pipe(gulp.dest('build'));
}

exports.watch = () => {
  gulp.watch('content/**/*.{md,yaml}', markdown);
  gulp.watch('content/**/*.ts', scripts);
  gulp.watch('content/**/*.less', stylesheets);
};

exports.default = gulp.parallel(markdown, scripts, stylesheets);
