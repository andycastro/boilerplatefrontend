const {src, dest, series, parallel, watch} = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();
const files = {
    sassFile: './build/sass/*.scss',    //start source files bellow
    jsToBuild:'./build/js/*.js',        
    cssToMinify: './build/css/*.css',   
    buildPathHtml: './build/*.html',    
    imgToMinify: './build/img/*.jpg',
    cssToBuild:'./build/css',           //paths destine to files bellow
    distToDistCss: './dist/css',        
    distToDistJs: './dist/js',          
    distPath: './dist/',                
    distToDistImg: './dist/img/'
}
// BrowserSync
function taskBrowserSync(done) {
    browserSync.init({
        server: {
        baseDir: "./dist/"
        },
        port: 3000
    });
    done();
}
// BrowserSync Reload
function taskReload(done) {
    browserSync.reload();
    done();
}
//task build sass to css
function sassTask(){
    return src(files.sassFile)
    .pipe(sass())
    .pipe(dest(files.cssToBuild))
}
//task minify css to production environment
function cssTask(){
    return src(files.cssToMinify)
    .pipe(uglifycss({
        "uglyComments": true
    }))
    .pipe(dest(files.distToDistCss));
}
//task javascript minifying and concat
function jsTask(){
    return src(files.jsToBuild)
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(dest(files.distToDistJs))
}
//task html minify
function htmlTask (){
    return src(files.buildPathHtml)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(files.distPath))
}
//task to images optimized
function imagesTask(){
    return src(files.imgToMinify)
    .pipe(image())
    .pipe(dest(files.distToDistImg));
}

//task watching files change
function watchTask(){
    watch([files.sassFile, files.jsToBuild, files.buildPathHtml, files.imgToMinify],
        series(taskReload, sassTask, cssTask, jsTask, htmlTask, imagesTask));
}

exports.default = series(
    parallel(sassTask, cssTask, jsTask, htmlTask, imagesTask, taskBrowserSync),
    watchTask
);