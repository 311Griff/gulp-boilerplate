'use strict';

var path = require('path');
var root = path.resolve(process.cwd());

module.exports = function() {

    return {
        autoPrefixBrowsers: [
            'last 2 versions',
            '> 5% in US',
            'ie >= 11',
            'edge >= 13',
            'and_chr >= 4.4',
            'ios_saf >= 8.4',
            'safari >= 9',
            'firefox >= 46',
            'chrome >= 50'
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
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        },
        images: root + '/_src/images/**/*.*',
        js: root + '/_src/scripts/site.js',
        jsAll: [
            '!./node_modules/**/*.js',
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
        root: root,
        sass: root + '/_src/sass/site.scss',
        sassAll: [
            root + '/_src/sass/*.scss',
            root + '/_src/sass/page/*.scss'
        ],
        url: 'loc.boilerplate.com'
    };
};