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

// gulp.task('watch', () => {
//   return gulp
//     // Watch the input folder for change,
//     // and run `sass` task when something happens
//     .watch('./public/src', ['sass'])
//     // When there is a change,
//     // log a message in the console
//     .on('change', function (event) {
//       console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
//     })
// })

// p.nodemon({script: 'server.js'}).on('restart', ['sass'])

gulp.task('start', () => {
  p.nodemon({
    script: 'server.js',
    ext: '*',
    ignore: [
      'public/dist/',
      'node_modules/'
    ],
    env: { 'NODE_ENV': 'development' }
  }).on('restart', ['sass'])
})
