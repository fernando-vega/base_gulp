var gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  gulpif = require('gulp-if'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create();

//config
var config = {
  styles: {
    main: './src/styles/main.scss',
    watch: './src/styles/**/*.scss',
    output: './build/css/'
  },
  html: {
    main: './src/*.pug',
    watch: './src/**/*.pug',
    output: './build/'
  },
  images: {
    main: './src/images/**/*',
    output: './build/images/'
  },
  js: {
    main: './src/js/*.js',
    watch: './src/js/*.js',
    output: './build/js/'
  }
}

//compile Jade
gulp.task('compile-pug', function () {
  return gulp.src(config.html.main)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(config.html.output))
    .pipe(browserSync.stream());
});

// Compile Styles

gulp.task('compile-sass', function () {
  gulp.src(config.styles.main)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'android 4'],
      cascade: false
    }))
    .pipe(gulp.dest(config.styles.output))
    .pipe(browserSync.stream());
});

//Compile JavaScript

gulp.task('compile-js', function () {
  gulp.src(config.js.main)
    .pipe(concat('/main.js'))
    .pipe(gulpif('build/', uglify()))
    .pipe(gulp.dest(config.js.output))
    .pipe(browserSync.stream());
});

//Optimize Images
gulp.task('images', function () {
  gulp.src(config.images.main)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.images.output));
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
});

gulp.task('watch', function () {
  gulp.watch(config.styles.watch, ['compile-sass']);
  gulp.watch(config.html.watch, ['compile-pug']);
  gulp.watch(config.js.watch, ['compile-js']);
});

gulp.task('compile', ['compile-sass', 'compile-pug', 'compile-js']);

gulp.task('default', ['watch', 'browser-sync', 'compile', 'images']);