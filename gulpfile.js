/**
 * Created by huangkk on 2016-10-17 15:45:35.
 * npm install -g gulp
 * npm install gulp gulp-requirejs-optimize gulp-rev-collector gulp-clean-css gulp-imagemin gulp-replace gulp-rev gulp-uglify --save-dev
 */
var gulp = require('gulp');
var requirejsOptimize = require('gulp-requirejs-optimize');
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');
var imgmin = require('gulp-imagemin');
var uglify = require('gulp-uglify')
var revCollector = require('gulp-rev-collector');
var rev = require('gulp-rev');
var rename = require("gulp-rename");
var date = new Date();
var version = date.toLocaleDateString() + date.getHours() + date.getMinutes();


//init.js压缩
gulp.task('init_build', function () {
    return gulp.src(['WebClient/control/init/*.js'])
        .pipe(requirejsOptimize(function (file) {
            return {
                paths: {
                    jquery: '../../lib/jquery.1.8.3',
                    avalon: '../../lib/avalon.2.1.17',
                    superSlide: '../../lib/jquery.SuperSlide.2.1.1'
                }, shim: {
                    superSlide: {
                       deps: ['jquery']
                    }
                }
            }
        }))
        .pipe(rev())
        .pipe(gulp.dest('output/WebClient/control/init'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('output/map/initmap'))
});

//资源转移
gulp.task('rmove_build', ['init_build'],function () {
    return gulp.src(['Routes/*'])
        .pipe(gulp.dest('output/Routes'))
});

//资源转移
gulp.task('smove_build',['rmove_build'], function () {
    return gulp.src(['Services/*'])
        .pipe(gulp.dest('output/Services'))
});

//资源转移
gulp.task('pmove_build',['smove_build'], function () {
    return gulp.src(['WebClient/lib/*'])
        .pipe(gulp.dest('output/WebClient/lib'))
});

//资源转移
gulp.task('vmove_build', ['pmove_build'],function () {
    return gulp.src(['Views/*'])
        .pipe(gulp.dest('output/Views'))
});

//init映射
gulp.task('initmap_build', ['vmove_build'], function () {
    return gulp.src(['output/map/initmap/*.json', 'output/Views/*.*'])
        .pipe(revCollector())
        .pipe(gulp.dest('output/Views'))
});

//js处理
gulp.task('js_build', ['initmap_build'],function () {
    return gulp.src(['WebClient/js/*'])
        .pipe(rev())
        .pipe(gulp.dest('output/WebClient/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('output/map/jsmap'))
});

//js映射
gulp.task('jsmap_build', ['js_build'], function () {
    return gulp.src(['output/map/jsmap/*.json', 'output/Views/*.*'])
        .pipe(revCollector())
        .pipe(gulp.dest('output/Views'))
});


//css压缩
gulp.task('css_build', ['jsmap_build'],function () {
    return gulp.src(['WebClient/css/*'])
        .pipe(replace('../img', 'http://download.yxybb.com/YXYBB/images'))
        .pipe(rename(function (path) {
            path.basename += "_" + version;
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('output/WebClient/css'))
});


//views处理
gulp.task('views_build', ['css_build'], function () {
    return gulp.src(['output/Views/*'])
        .pipe(replace('../img', 'http://download.yxybb.com/YXYBB/images'))
        .pipe(replace('/main.css', '/main_' + version + '.css'))
        .pipe(gulp.dest('output/Views'))
});


gulp.task('default', ['views_build']);