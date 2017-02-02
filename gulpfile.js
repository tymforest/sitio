var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip');
    sitemap = require('gulp-sitemap'),
    runSequence = require('run-sequence');

//  Minify .html
gulp.task('markup', function(){
  gulp.src('build/**/*.html')
  .pipe(htmlmin())
  .pipe(gulp.dest('build'))
});

//  Minify site.css + gzip site.css
gulp.task('styles', function(){
  gulp.src(['build/stylesheets/*.css'])
  .pipe(cssmin())
  .pipe(gulp.dest('build/stylesheets'))
  .pipe(gzip())
  .pipe(gulp.dest('build/stylesheets'))
});

//  Minify and gzip all .js files
gulp.task('scripts', function(){
  gulp.src('build/javascripts/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/javascripts'))
  .pipe(gzip())
  .pipe(gulp.dest('build/javascripts'))
});

//  Generate sitemap
gulp.task('sitemap', function() {
  gulp.src('build/**/*.html', {
    read: false
  })
  .pipe(sitemap({
    siteUrl: 'http://www.tymforest.com'
  }))
  .pipe(gulp.dest('./build'));
});

// Run previous `gulp` tasks in sequence
gulp.task('sequence', function(callback) {
  runSequence('markup', 'styles', 'scripts', 'sitemap');
});

// Build
gulp.task('build', ['sequence']);
