var gulp        = require('gulp');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

sass.compiler = require('node-sass');

// tiny static page generator
gulp.task('fileinclude', function() {
  return gulp.src(['html/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

// process JS files and return to the stream
gulp.task('js', function () {
    return gulp.src('assets/scripts/**/*.js')
        .pipe(gulp.dest('build/assets/scripts'))
        .pipe(browserSync.stream());
});

// process fonts
gulp.task('fonts', function () {
    return gulp.src('assets/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('build/assets/fonts'))
        .pipe(browserSync.stream());
});

// process images
gulp.task('images', function () {
    return gulp.src('assets/images/**/*.+(png|jpg|gif|svg|ico)')
        .pipe(gulp.dest('build/assets/images'))
        .pipe(browserSync.stream());
});

//process scss files and retun to the stream
gulp.task('sass', function () {
    return gulp.src('assets/sass/main.scss')
      .pipe(sass({
          outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe( rename({suffix: '.min'}))
      .pipe(gulp.dest('build/assets/css'))
      .pipe(browserSync.stream());
});

// process CSS files and return to the stream
// gulp.task('css', function () {
//     return gulp.src('assets/styles/*.css')
//         .pipe(gulp.dest('build/assets/styles'))
//         .pipe(browserSync.stream());
// });

// ensures these tasks are completed before reloading browsers
gulp.task('js-watch', ['js'], reload);
gulp.task('font-watch', ['fonts'], reload);
gulp.task('image-watch', ['images'], reload);
gulp.task('sass-watch', ['sass'], reload);
gulp.task('include-watch', ['fileinclude'], reload);

gulp.task('sass:watch', function () {
    gulp.watch('assets/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['fileinclude', 'js', 'sass', 'fonts', 'images'], function () {
    // serve files from the build folder
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    // watch files and run tasks
    gulp.watch("html/**/*.html", ['include-watch']);
    gulp.watch("assets/scripts/**/*.js", ['js-watch']);
    gulp.watch("assets/fonts/*.{eot,svg,ttf,woff,woff2}", ['font-watch']);
    gulp.watch("assets/images/**/*.+(png|jpg|gif|svg|ico)", ['image-watch']);
    gulp.watch('assets/sass/**/*.scss', ['sass-watch']);
});