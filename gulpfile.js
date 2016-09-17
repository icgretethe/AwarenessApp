var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');

gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function() {
    gulp.watch('scss/**/*.scss',['styles']);
});