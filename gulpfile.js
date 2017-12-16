const gulp = require('gulp');
const webpack = require('webpack-stream');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');

const webpackConfig = require('./webpack.config.js');
const plugins = [atImport, cssnext];

gulp.task('build-presenter', () => {
    return gulp
        .src('src/presenter.ts')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-styles', () => {
    return gulp
        .src('styles/main.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-styles', () => {

    return gulp.watch('styles/**/*.css', ['build-styles']);
});
