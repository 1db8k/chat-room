const gulp = require('gulp')
const p = require('gulp-load-plugins')()

gulp.task('sass', () => {
  return gulp
    .src('./public/src/scss/*.scss')
    .pipe(p.sourcemaps.init())
    .pipe(p.sass({ errLogToConsole: true, outputStyle: 'expanded' })
      .on('error', p.sass.logError))
    .pipe(p.sourcemaps.write())
    .pipe(p.autoprefixer())
    .pipe(gulp.dest('./public/dist/css'))
})

gulp.task('compress', function () {
  gulp.src(['!./public/src/js/*.min.js', './public/src/js/*.js'])
    .pipe(p.sourcemaps.init())
    .pipe(p.uglify())
    .pipe(p.sourcemaps.write())
    .pipe(gulp.dest('./public/dist/js/'))
})

gulp.task('default', () => {
  p.nodemon({
    script: 'server.js',
    ext: '*',
    ignore: [
      'public/dist/',
      'node_modules/'
    ],
    env: { 'NODE_ENV': 'development' }
  }).on('restart', ['compress', 'sass'])
})
