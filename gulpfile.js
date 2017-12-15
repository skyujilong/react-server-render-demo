'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const path = require('path');

gulp.task('build:server', () => {
    gulp.src([
        path.resolve(__dirname, 'src', 'server/**/*.js'),
        path.resolve(__dirname, 'src', 'server/**/*.jsx')
    ]).pipe(babel({
        "presets": [
            "react"
        ],
        "plugins": [
            "transform-es2015-modules-commonjs"
        ]
    })).pipe(gulp.dest(path.resolve(__dirname, 'lib', 'server')));
});

gulp.task('build:client', () => {
    gulp.src([
        path.resolve(__dirname, 'src', 'client/pages/**/*.js'),
        path.resolve(__dirname, 'src', 'client/pages/**/*.jsx')
    ]).pipe(babel({
        "presets": [
            "env",
            "react"
        ]
    })).pipe(gulp.dest(path.resolve(__dirname, 'lib', 'client', 'pages')));
});


gulp.task('build', ['build:client', 'build:server']);