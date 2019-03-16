'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import runSequence from 'gulp-run-sequence'
import rename from 'gulp-rename'

import yarn from 'gulp-yarn'
import sass from 'gulp-sass'
import htmlToJs from 'gulp-angular-html2js'
import concat from 'gulp-concat'
import minify from 'gulp-babel-minify'
import clean from 'gulp-clean'
import nodemon from 'gulp-nodemon'

import vendor from 'gulp-concat-vendor'
import concatCss from 'gulp-concat-css'
import cleanCSS from 'gulp-clean-css'

gulp.task('yarn', () => {
  return gulp.src(['./package.json'])
    .pipe(yarn())
})

gulp.task('vendorsJs', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/tether/dist/js/tether.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/@fortawesome/fontawesome-free/js/all.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-messages/angular-messages.min.js'
  ])
    .pipe(vendor('vendors.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('vendorsCss', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
  ])
    .pipe(concatCss('vendors.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('sass', () => {
  return gulp.src('public/app/assets/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
      dirname: '/',
      basename: 'app',
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('htmlToJs', () => {
  gulp.src(['public/app/views/**/*.html', 'public/app/directives/**/*.html'])
    .pipe(htmlToJs({
      moduleName: function (filename, subpath) {
        return subpath.replace(/^public\/app\//, '')
      },
      templateUrl: function (filename) {
        return 'templates/' + filename
      },
      rename: function (fileName) {
        return fileName + '.js'
      }
    }))
    .pipe(gulp.dest('public/tmp'))
})

gulp.task('concat', () => {
  return gulp.src(['public/app/app.js', 'public/app/**/*.js', 'public/tmp/**/*.html.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat({
      newLine: ';',
      path: 'app.js'
    }))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('minify', () => {
  return gulp.src('public/dist/app.js')
    .pipe(minify({
      mangle: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('clean', () => {
  return gulp.src(['public/tmp', 'public/dist/app.css', 'public/dist/app.js'], {read: false})
    .pipe(clean({force: true}))
})

gulp.task('nodemon', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: [
      'node_modules/',
      'public/'
    ],
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('watch', () => {
  gulp.watch('gulpfile.babel.js', () => {
    runSequence('yarn', ['vendorsJs', 'vendorsCss'], ['sass', 'htmlToJs'], 'concat', 'minify', ['nodemon'])
  })
  gulp.watch(['public/app/**/*.html', 'public/app/app.js', 'public/app/**/*.js'], () => {
    runSequence('htmlToJs', 'concat', 'minify')
  })
  gulp.watch('public/app/assets/sass/*.scss', ['sass'])
})

gulp.task('default', () => {
  runSequence('yarn', ['vendorsJs', 'vendorsCss'], ['sass', 'htmlToJs'], 'concat', 'minify', 'clean', ['nodemon', 'watch'])
})
