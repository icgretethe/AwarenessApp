var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var server = require('gulp-express');

gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function() {
    server.run(['app.js']);
    gulp.watch('scss/**/*.scss',['sass']);
    gulp.watch('*.html', server.notify);
});