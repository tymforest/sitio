const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-csso');
const uglify = require('gulp-uglify');
const gzip = require('gulp-gzip');
const sitemap = require('gulp-sitemap');

function minifyHtml(cb) {
  gulp.src('build/**/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('build'));
  cb();
}

function compressCss(cb) {
  gulp.src(['build/stylesheets/*.css'])
    .pipe(cssmin())
    .pipe(gzip())
    .pipe(gulp.dest('build/stylesheets'))
  cb();
}

function compressJs(cb) {
  gulp.src('build/javascripts/*.js')
    .pipe(uglify())
    .pipe(gzip())
    .pipe(gulp.dest('build/javascripts'))
  cb();
}

function generateSitemap(cb) {
  gulp.src('build/**/*.html', {read:false})
    .pipe(sitemap({siteUrl:'http://www.tymforest.com'}))
    .pipe(gulp.dest('./build'));
  cb();
}

exports.default = gulp.series(
  minifyHtml,
  compressCss,
  compressJs,
  generateSitemap,
);