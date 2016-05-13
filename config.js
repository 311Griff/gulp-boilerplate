'use strict';

var path = require('path');
var root = path.resolve(process.cwd());

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
        root: root,
        sass: root + '/_src/sass/site.scss',
        sassAll: [
            root + '/_src/sass/*.scss',
            root + '/_src/sass/page/*.scss'
        ]
    };
};