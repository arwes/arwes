const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const gif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const livereload = require('gulp-livereload');

const settings = {
  dev: process.env.NODE_ENV !== 'production',
  sass: {
    includePaths: ['./'],
    files: [
      './src/**/*.scss',
      './docs/**/*.scss'
    ],
    output: './docs/css',
  }
};

const postcssList = [
  autoprefixer({browsers: [
    'last 10 version',
    '> 5%'
  ]})
];

if (!settings.dev) {
  postcssList.push(cssnano({
     safe: true
  }));
}

gulp.task('sass', function () {
  return gulp.
    src(settings.sass.files).
    pipe(
      gif(settings.dev, sourcemaps.init())
    ).
    pipe(
      sass({
        includePaths: settings.sass.includePaths,
        outputStyle: settings.dev ? 'nested' : 'compressed',
        sourceMap: settings.dev,
        sourceComments: settings.dev,
        sourceMapEmbed: settings.dev
      }).
      on('error', sass.logError)
    ).
    pipe(
      gif(settings.dev, sourcemaps.write(undefined, { sourceRoot: null }))
    ).
    pipe(
      postcss(postcssList)
    ).
    pipe(
      rename({ dirname: '' })
    ).
    pipe(
      gulp.dest(settings.sass.output, { overwrite: true })
    ).
    pipe(
      gif(settings.dev, livereload())
    );
});

gulp.task('watch', function () {
  if (settings.dev) {
    livereload.listen();
    gulp.watch(settings.sass.files, ['sass']);
  }
});

gulp.task('default', ['sass', 'watch']);
