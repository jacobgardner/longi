const gulp = require('gulp');
const webpack = require('webpack-stream');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');
const sequence = require('gulp-sequence');
const browserSync = require('browser-sync').create();

const webpackConfig = require('./webpack.config.js');
const plugins = [atImport, cssnext];

function syncReload() {
    // TODO:...
    browserSync.reload();
}

function build(watch = false) {
    return gulp
        .src(['src/main.ts', 'src/audience.ts'])
        .pipe(
            webpack(
                Object.assign({}, webpackConfig, {
                    watch,
                }), null, syncReload
            )
        )
        .pipe(gulp.dest('./dist'));
}

gulp.task('build-scripts', () => {
    return build();
});

gulp.task('watch-scripts', () => {
    return build(true);
});

gulp.task('build-styles', () => {
    return gulp
        .src('styles/main.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('watch-styles', ['build-styles'], () => {
    return gulp.watch('styles/**/*.css', ['build-styles']);
});


gulp.task('watch-setup', () => {
    return browserSync.init({
        port: 8080,
        open: false,
        server: {
            baseDir: './'
        }
    })
});

gulp.task('watch-html', () => {
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('serve', sequence('watch-setup', ['watch-html', 'watch-scripts', 'watch-styles']))

gulp.task('default', ['serve']);
