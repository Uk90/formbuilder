var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

////////////////////////////////////format in gulp to perform a tasks
//Start
// gulp.task('task-name', function () {
//   return gulp.src('source-files') // Get source files with gulp.src
//     .pipe(aGulpPlugin()) // Sends it through a gulp plugin
//     .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
// })
//End
/////////////////////////////////////simple sass convertion task
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
          .pipe(sass())
          .pipe(gulp.dest('app/css'))
          .pipe(browserSync.reload({
            stream:true
          }))
});
/////////////////////////////////////browser reload task whenever a change occurs
gulp.task('browserSync', function(){
  browserSync.init({
    server:{
      baseDir: 'app',
    },
  })
});
//////////////////////////////////Minify-js useinf-useref
gulp.task('useref',function(){
  return gulp.src('app/*.html')
          .pipe(useref())
          // .pipe(gulpIf('*.js', uglify()))
          .pipe(gulpIf('*.css', cssnano()))
          .pipe(gulp.dest('dist'))
});

//////////////////////////Minify-images
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'))
});

//////////////////////////////////whatch is to re-run paticullar task whenever a change in the particular file changes
gulp.task('watch',['browserSync','sass'], function(){
  //All tasks to watch
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);

});
