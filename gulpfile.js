var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify"); 
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var bower = require('gulp-bower');
var browserSync = require("browser-sync").create();

var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var gutil        = require('gulp-util');
var cp           = require('child_process');
var path         = require('path');
var imagemin     = require('gulp-imagemin');

var config = {
     sassPath: './wsgi/myproject/avec/assets/stylesheets',
     bowerDir: './bower_components' ,
    assetPath: './wsgi/myproject/avec/assets',
    staticPath: './wsgi/myproject/avec/static',
    jsPath: './wsgi/myproject/avec/static/min',
}

//Instala todas as dependencias do bower.json
gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

//Compila as fonts do bootstrap
gulp.task('fonts', function() {
  return gulp.src([
    config.bowerDir + '/bootstrap-sass-official/assets/fonts/**/*',
  ])
  .pipe(gulp.dest(config.jsPath + '/fonts'));
});

//Minify JS
gulp.task('js', function() {
  return gulp.src([
    //Adicionar aqui todos os caminhos dos js utilizados no projeto.
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.js',
  ])
  .pipe(uglify('app.js', {
    compress: false,
    outSourceMap: true,
  }))
  .pipe(gulp.dest(config.jsPath + '/javascript'));
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/style.scss')
         .pipe(sass({
             style: 'compressed',
            outputStyle: 'compressed',
            errLogToConsole: true,
            includePaths: [config.bowerDir + '/bootstrap-sass-official/assets/stylesheets'],
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             })))
        .pipe(autoprefixer('last 2 versions', 'ie 9'))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(sourcemaps.write('./stylesheets/maps'))
         .pipe(gulp.dest(config.jsPath + '/stylesheets')); 
});

// minifiy images
gulp.task('images', function () {
  return gulp.src('images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('images'));
});

// Watch files
gulp.task('watch', function () {
    gulp.watch([config.sassPath + '/**/*.scss', 'index.html', '**/*.html', config.assetPath + 'javascript/**/*', config.staticPath + 'img/*'], ['css', 'js', browserSync.reload] );
});

gulp.task('server', ['css', 'js'], function() {
  browserSync.init({
    proxy: "localhost:8000"
  });

    gulp.watch(config.sassPath + '/**/*.scss', ['watch']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
});

gulp.task('browser-sync', function(){
  browserSync.init({
    proxy: "localhost:8000"
  });
});

  gulp.task('default', ['bower', 'fonts', 'css', 'js', 'server']);
