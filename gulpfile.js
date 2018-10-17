let gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglifyes'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    bs = require('browser-sync'),
    htmlMin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    delFiles = require('del'),
    cssMin = require('gulp-csso'),
    babel = require('gulp-babel'),
    util = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    jsonMinify = require('gulp-json-minify');


const paths = {
    devHtml: 'dev/html/**/*.html',
    devSass: 'dev/css/**/*.css',
    devJs: 'dev/js/**/*.js',
    project: 'dist',
    projectCss: 'dist/css',
    projectJs: 'dist/js',
    devJson: 'dev/json/**/*.json',
    projrctJson: 'dist/json',
    picDev: 'dev/html/img/**/*',
    picDist: 'dist/img'
};


gulp.task('html', () => {
    return gulp.src(paths.devHtml) //Выбираем файл с котороыи работаем
        .pipe(htmlMin({
            collapseWhitespace: true
        })) //Минификация html
        .pipe(gulp.dest(paths.project)); // Сохранение файла
});

gulp.task('pic', () =>
    gulp.src(paths.picDev)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.picDist))
);

gulp.task('sass', () => {
    return gulp.src(paths.devSass)
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssMin())
        .pipe(gulp.dest(paths.projectCss));
});
gulp.task('js:es6', () => {
    return gulp.src(paths.devJs)
        .pipe(gulp.dest(paths.projectJs))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.projectJs));
});
gulp.task('json', () => {
    return gulp.src(paths.devJson)
        .pipe(jsonMinify())
        .pipe(gulp.dest(paths.projrctJson))
        .on('error', util.log);
});
gulp.task('js:babel', () => {
    return gulp.src(paths.devJs)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({
            suffix: '.es5'
        }))
        .pipe(gulp.dest(paths.projectJs));
});
gulp.task('clean', () => {
    return delFiles(['dis/**', '!dis'])
});
gulp.task('server', () => {
    return bs({
        browser: 'chrome.exe',
        open: true,
        server: {
            baseDir: 'dist'
        }
    })
});
gulp.task('sass:watch', () => {
    return gulp.watch('dev/css/**/*.css', gulp.series('sass', (done) => {
        bs.reload();
        done();
    }));
});
gulp.task('js:watch', () => {
    return gulp.watch('dev/js/**/*.js', gulp.series('js:es6', (done) => {
        bs.reload();
        done();
    }));
});
gulp.task('html:watch', () => {
    return gulp.watch('dev/html/**/*.html', gulp.series('html', (done) => {
        bs.reload();
        done();
    }));
});
gulp.task('default', gulp.series('clean', gulp.parallel('server', 'pic', 'html', 'sass', 'js:es6', 'js:babel', 'sass:watch', 'html:watch', 'js:watch', 'json')));
