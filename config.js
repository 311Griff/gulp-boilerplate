'use strict';

var path = require('path');
var root = path.resolve(process.cwd());
var cdn = process.env.HOME + '/sites/cms-media/trunk/cdn/boilerplate/';
var url = 'loc.boilerplate.com';

module.exports = function() {

    return {
        autoPrefixBrowsers: [
            'last 2 versions',
            'ie >= 11',
            'and_chr >= 4.4',
            'ios_saf >= 8.0',
            'safari >= 8.0'
        ],
        fonts: root + '/_src/fonts/**/*.*',
        handlebars: {
            bustCache: true,
            debug: false,
            data: root + '/_src/html/_data/**/*.{js,json}',
            helpers: [
                './node_modules/handlebars-layouts',
                root + '/_src/scripts/plugins/Helpers.js'
            ],
            partials: [
                root + '/_src/html/_partials/**/*.hbs',
                root + '/_src/html/_layouts/**/*.hbs'
            ],
            parseHelperName: function(options, file) {
                return path.basename(file.path).replace('.hbs', '');
            },
            parsePartialName: function(options, file) {
                return path.basename(file.path).replace('.hbs', '');
            }
        },
        html: [
            root + '/_src/html/**/*.{html,hbs,php}',
            '!' + root + '/_src/html/_**/**/*'
        ],
        htmlmin: {
            removeComments: true,
            collapseWhitespace: true,
            removeScriptTypeAttributes: false,
            removeStyleLinkTypeAttributes: false
        },
        images: [
            root + '/_src/images/**/*.*',
            '!' + root + '/_src/images/logos/**/*.*'
        ],
        js: root + '/_src/scripts/site.js',
        jsAll: [
            '!./node_modules/**/*.js',
            '!' + root + '/_src/scripts/pages.js',
            './*.js',
            root + '/_src/scripts/**/*.js'
        ],
        json: root + '/_src/html/_data/**/*.json',
        output: {
            css: root + '/css',
            fonts: root + '/fonts',
            images: root + '/images',
            js: root + '/js',
            html: root + '/pages'
        },
        cdn: {
            css: cdn + '/css',
            fonts: cdn + '/fonts',
            images: cdn + '/images',
            js: cdn + '/js',
            html: cdn + '/pages'
        },
        root: root,
        sass: root + '/_src/sass/site.scss',
        sassAll: [
            root + '/_src/sass/*.scss',
            root + '/_src/sass/page/*.scss'
        ],
        url: url
    };
};