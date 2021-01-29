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

const exec = require('gulp-exec');
const yaml = require('js-yaml');
const through2 = require('through2');
const Concat = require('concat-with-sourcemaps');
const del = require('del');

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();


function clean() {
  return del(['working/*']).then((d) => {
    console.log('Deleted...', d)
  })
}

function markdown() {
  return gulp.src(['working/*/', '!working/shared/'])
      .pipe(textbooks(['en'], __dirname + '/build/.cache.json'))
      .pipe(gulp.dest('build'));
}

function scripts() {
  return gulp.src(['working/*/*.ts', '!working/shared/**'])
      .pipe(rollup({plugins: [nodeResolve(), typescript()],},
                   {format: 'iife', name: 'StepFunctions'}))
      .pipe(rename({extname: '.js'}))
      .pipe(gulp.dest('build'));
}

function stylesheets() {
  return gulp.src(['working/*/*.less', '!working/shared/**'])
      .pipe(less())
      .pipe(postcss([autoprefixer()]))
      .pipe(rename({extname: '.css'}))
      .pipe(gulp.dest('build'));
}

function nbtomd() {
  return gulp.src(['notebooks/*/', '!notebooks/shared'])
    .pipe(exec(file => {
      const output_dir = `${__dirname}/working/${path.basename(file.path)}`
      const shared_dir = `${__dirname}/working/shared`
      const toc = `${CWD}/notebooks/toc.yml`
      const converter = `textbook_converter ${file.path} -o ${output_dir} -s ${shared_dir} -t ${toc}`
      return `cd ../textbook-converter && python -m ${converter}`
    }, {maxBuffer: 2048 * 1000}))
}

// TODO: move this into textbook-converter
function nbtomdupdate() {
  const toc = yaml.load(fs.readFileSync(CWD + '/notebooks/toc.yml'), 'utf8');

  return gulp.src(['working/*/', '!working/shared/'])
    .pipe(function (opt) {
      return through2.obj(function (file, enc, cb) {
        const content = toc.find(t => file.path.endsWith(t.url));
        if (content) {
          fs.writeFileSync(path.join(file.path, 'styles.less'), '\n@import "../shared/shared";\n');
          fs.writeFileSync(path.join(file.path, 'function.ts'), '\nimport "../shared/shared";\n');
        }

        cb();
      });
    }({}));
}

function movecontent() {
  return gulp.src(['content/**/*']).pipe(gulp.dest('working'));
}

exports.watch = () => {
  gulp.watch('content/**/*.{md,yaml}', gulp.series(movecontent, markdown));
  gulp.watch('content/**/*.ts', gulp.series(movecontent, scripts));
  gulp.watch('content/**/*.less', gulp.series(movecontent, stylesheets));
  gulp.watch('notebooks/**/*.ipynb', gulp.series(nbtomd, nbtomdupdate, markdown));
};

exports.default = gulp.series(clean, movecontent, nbtomd, nbtomdupdate, markdown, scripts, stylesheets);
