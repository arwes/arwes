const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const gif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const livereload = require('gulp-livereload');

const dev = process.env.NODE_ENV !== 'production';

const settings = {
  sass: {
    includePaths: ['./'],
    files: ['./demos/**/*.scss'],
    output: './demos/css',
  }
};

const postcssList = [
  autoprefixer({browsers: [
    'last 10 version',
    '> 5%'
  ]})
];

if (!dev) {
  postcssList.push(cssnano({
     safe: true
  }));
}

gulp.task('sass', function () {
  return gulp.
    src(settings.sass.files).
    pipe(
      gif(dev, sourcemaps.init())
    ).
    pipe(
      sass({
        includePaths: settings.sass.includePaths,
        outputStyle: dev ? 'nested' : 'compressed',
        sourceMap: dev,
        sourceComments: dev,
        sourceMapEmbed: dev
      }).
      on('error', sass.logError)
    ).
    pipe(
      gif(dev, sourcemaps.write(undefined, { sourceRoot: null }))
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
      gif(dev, livereload())
    );
});

gulp.task('watch', function () {
  if (dev) {
    livereload.listen();
    gulp.watch(settings.sass.files, ['sass']);
  }
});

gulp.task('default', ['sass', 'watch']);
