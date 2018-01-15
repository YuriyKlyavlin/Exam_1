var gulp        = require('gulp');
var jade        = require('gulp-jade');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [ "last 5 versions",
                        "opera 12-13",
                        "ie >= 9",
                        "ff ESR"],
            cascade: false
        }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

// чтобы запустить эту задачу, наберите в командной строке gulp jade
gulp.task('jade', function() {
    return gulp.src('src/templates/**/*.jade')
        .pipe(jade()) 
        .pipe(gulp.dest('builds/development')); // указываем gulp куда положить скомпилированные HTML файлы
});

gulp.task('default', ['serve']);