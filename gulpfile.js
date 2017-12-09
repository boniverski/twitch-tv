const gulp         = require('gulp');
const uglify	   = require('gulp-uglify');
const sass         = require('gulp-sass');
const minifyCss    = require('gulp-minify-css');
const bs           = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// COPY ALL HTML FILES
gulp.task('copyHtml', function () {
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'))
      .pipe(bs.reload({stream: true}));
});

// MINIFY JS
gulp.task('minify', function() {
  gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist'))
      .pipe(bs.reload({stream: true}));
});

// SASS COMPILER WITH CSS PREFIXER
gulp.task('sass', function () {
    return gulp.src(['src/scss/*.scss'])
                .pipe(sass())
			            .pipe(autoprefixer({browsers: ['last 2 versions']}))
                .pipe(minifyCss())
                .pipe(gulp.dest('dist'))
                .pipe(bs.reload({stream: true}));
});

//BROWSER-SYNC - AUTO REFRESH
gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: './dist'
        }
    });
});

//GULP RUN
gulp.task('default', ['browser-sync'], function () {
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/js/*.js', ['minify']);
    gulp.watch('src/scss/*.scss', ['sass']);
});
