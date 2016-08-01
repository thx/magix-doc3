var wrapTMPL = 'define("${moduleId}",[${requires}],function(require){\r\n/*${vars}*/\r\n${content}\r\n});';
var wrapNoDepsTMPL = 'define("${moduleId}",function(){\r\n${content}\r\n});';
var wrapNoExports = 'seajs.use([${requires}],function(${vars}){${content}});';

var tmplFolder = 'tmpl'; //template folder
var srcFolder = 'src'; //source folder
var buildFolder = 'build'; //build folder

var excludeTmplFolders = [
    'tmpl/boot.js',
    'tmpl/magix.js',
    'tmpl/sea.js',
    'tmpl/zepto.js',
    'tmpl/tmpl.js',
    'tmpl/data.js',
    'tmpl/highlight.pack.js'
];
var onlyAllows = {
    '.html': 1,
    '.css': 1
};

var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var combineTool = require('magix-combine');
var del = require('del');


combineTool.config({
    tmplFolder: tmplFolder,
    srcFolder: srcFolder,
    buildFolder: buildFolder,
    excludeTmplFolders: excludeTmplFolders,
    onlyAllows: onlyAllows,
    generateJSFile: function(o) {
        var tmpl = wrapNoExports;
        tmpl = o.requires.length ? wrapTMPL : wrapNoDepsTMPL;
        for (var p in o) {
            var reg = new RegExp('\\$\\{' + p + '\\}', 'g');
            tmpl = tmpl.replace(reg, (o[p] + '').replace(/\$/g, '$$$$'));
        }
        return tmpl;
    }
});

gulp.task('cleanSrc', function() {
    return del(srcFolder);
});
gulp.task('combine', ['cleanSrc'], function() {
    combineTool.combine();
});
gulp.task('watch', ['combine'], function() {
    watch(tmplFolder + '/**/*', function(e) {
        console.log(e.path);
        if (fs.existsSync(e.path)) {
            combineTool.processFile(e.path);
        } else {
            combineTool.removeFile(e.path);
        }
    });
});

var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
gulp.task('cleanBuild', function() {
    return del(buildFolder);
});
gulp.task('build', ['cleanBuild'], function() {
    combineTool.build();
    gulp.src(buildFolder + '/**/*.js')
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest(buildFolder));

    gulp.src(buildFolder + '/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest(buildFolder));
});