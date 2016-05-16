'use strict';

var gulp = require('gulp');
var plugin = require('gulp-load-plugins')({lazy: true});
var config = require('./config')();
var path = require('path');
var fs = require('fs');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var del = require('del');
var pngquant = require('imagemin-pngquant');
var webpack = require('webpack-stream');

gulp.task('default', plugin.taskListing);

gulp.task('_sassLint', function() {

    args.lintSass = (args.lintFile) ? args.lintFile : config.sassAll;

    return gulp.src(args.lintSass)
        .pipe(plugin.plumber(function() {
            this.emit('end');
        }))
        .pipe(plugin.scssLint({
            config: './.scss-lint.yml',
            maxBuffer: 300 * 2048,
            customReport: plugin.scssLintStylish
        }))
        .pipe(plugin.scssLint.failReporter());
});

gulp.task('_sass', function() {

    fs.readdir(config.root + '/_src/sass/page', function(err, files) {
        if (err) {
            plugin.util.log(plugin.util.colors.red(err));
        }

        fs.writeFile('./_src/sass/_pages.scss', formatSassFiles(files));
    });

    return gulp.src(config.sass)
        .pipe(plugin.if(args.verbose, plugin.print()))
        .pipe(plugin.plumber(function(error) {
            plugin.util.log(plugin.util.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(plugin.sass())
        .pipe(plugin.autoprefixer({browsers: config.autoPrefixBrowsers}))
        .pipe(plugin.mergeMediaQueries())
        .pipe(plugin.if(args.build, plugin.csso()))
        .pipe(gulp.dest(config.output.css))
        .pipe(plugin.if(browserSync.active, browserSync.reload({stream: true})));
});

gulp.task('_jsLint', function() {
    var allJs = JSON.parse(JSON.stringify(config.jsAll));

    if (args.lintFile) {
        allJs = [args.lintFile];
    }

    allJs.push('!' + config.root + '/_src/scripts/plugins/**/*.js');

    return gulp.src(allJs)
        .pipe(plugin.if(args.verbose, plugin.print()))
        .pipe(plugin.plumber(function() {
            this.emit('end');
        }))
        .pipe(plugin.jscs())
        .pipe(plugin.jscs.reporter())
        .pipe(plugin.jscs.reporter('fail'))
        .pipe(plugin.jshint('./.jshintrc'))
        .pipe(plugin.jshint.reporter('jshint-stylish'))
        .pipe(plugin.jshint.reporter('fail'));
});

gulp.task('_js', function() {

    fs.readdir(config.root + '/_src/scripts/page', function(err, files) {
        if (err) {
            plugin.util.log(plugin.util.colors.red(err));
        }

        fs.writeFile('./_src/scripts/pages.js', '\'use strict\';\r\n' +
            '' +
            'module.exports = {\r\n' +
            '    init: init\r\n' +
            '};\r\n' +
            '\r\n' +
            'function init() {\r\n' +
            '    return [\r\n' +
            formatJsFiles(files) + '\r\n' +
            '    ];\r\n' +
            '}\r\n');
    });

    return gulp.src(config.js)
        .pipe(plugin.if(args.verbose, plugin.print()))
        .pipe(plugin.plumber(function(error) {
            plugin.util.log(plugin.util.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(webpack(require('./webpack.js')))
        .pipe(plugin.if(args.build, plugin.stripDebug()))
        .pipe(plugin.if(args.build, plugin.stripComments()))
        .pipe(plugin.if(args.build, plugin.uglify()))
        .pipe(gulp.dest(config.output.js))
        .pipe(plugin.if(browserSync.active, browserSync.reload({stream: true})));
});

gulp.task('_html', function() {

    return gulp
        .src(config.html)
        .pipe(plugin.if(args.verbose, plugin.print()))
        .pipe(plugin.plumber(function(error) {
            plugin.util.log(plugin.util.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(plugin.data(getJSON))
        .pipe(plugin.frontMatter({
            property: 'data'
        }))
        .pipe(plugin.hb(config.handlebars))
        .pipe(plugin.if(args.build, plugin.stripComments()))
        .pipe(plugin.specialHtml())
        .pipe(plugin.if(args.build, plugin.htmlmin(config.htmlmin)))
        .pipe(gulp.dest(config.output.html))
        .pipe(plugin.if(browserSync.active, browserSync.reload({stream: true})));
});

gulp.task('_fonts', function() {
    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.output.fonts));
});

gulp.task('_images', function() {
    return gulp.src(config.images)
        .pipe(plugin.if(args.verbose, plugin.print()))
        .pipe(plugin.plumber(function(error) {
            plugin.util.log(plugin.util.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(plugin.if(args.build, plugin.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.output.images));
});

gulp.task('_watch', function() {

    plugin.watch(config.root + '/_src/html/**/*.*', {usePolling: true}, function(event) {
        changeEvent(event);
        gulp.start('_html');
    });

    plugin.watch(config.root + '/_src/sass/**/*.scss', {usePolling: true}, function(event) {
        changeEvent(event);
        args.lintFile = event.path;
        gulp.start('_sassLint', ['_sass']);
    });

    plugin.watch(config.jsAll, {usePolling: true}, function(event) {
        changeEvent(event);
        args.lintFile = event.path;
        gulp.start('_jsLint', ['_js']);
    });
});

gulp.task('_sync', function() {

    if (browserSync.active) {
        return;
    }

    var options = {
        ghostMode: args.build ? {
            clicks: false,
            location: false,
            forms: false,
            scroll: false
        } : {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        logPrefix: 'BrowserSync',
        open: 'external',
        port: 1337,
        xip: true,
        proxy: {
            target: config.url
            //make sure the vhost exist in apache and locally routed at /etc/hosts 127.0.0.1
        }
    };

    return browserSync(options);
});

gulp.task('clean', function(done) {
    var dir = [
        './css/**/*',
        './images/**/*',
        './js/**/*',
        './pages/**/*',
        './fonts/**/*'
    ];

    return del(dir, done);
});

gulp.task('build', function(cb) {
    args.build = true;
    args.verbose = false;

    return plugin.sequence('_sass', '_js', '_html', '_fonts', '_images', '_watch', '_sync', cb);
});

gulp.task('dev', function(cb) {
    args.build = false;
    args.verbose = true;
    config.handlebars.debug = true;

    return plugin.sequence('_sassLint', '_sass', '_jsLint', '_js', '_html', '_fonts', '_images', '_watch', '_sync', cb);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getJSON(file) {
    try {
        return require(file.path.replace('.php', '.json'));
    } catch (e) {
        return {error: true};
    }
}

function changeEvent(event) {
    plugin.util.log(plugin.util.colors.blue('File ' + path.basename(event.path) + ' changed'));
}

function formatJsFiles(files) {
    var text = '';

    for (var i in files) {
        if (files.hasOwnProperty(i)) {
            text += '        \'' + files[i].replace('.js', '') + '\',\r\n';
        }
    }

    return text.replace(/,\s*$/, '');
}

function formatSassFiles(files) {
    var text = '';

    for (var i in files) {
        if (files.hasOwnProperty(i)) {
            text += '@import \'page/' + files[i].replace('.scss', '') + '\';\r\n';
        }
    }

    return text.replace(/,\s*$/, '');
}