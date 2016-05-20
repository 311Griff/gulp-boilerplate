'use strict';

var webpack = require('webpack');
var path = require('path');
var root = path.resolve(process.cwd());

module.exports = {
    entry: {
        site: root + '/_src/scripts/site.js'
    },
    externals: {
        $: 'jQuery',
        jquery: 'jQuery',
        jQuery: 'jQuery',
        'window.jQuery': 'jQuery'
    },
    output: {
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.ProvidePlugin({
            utils: root + '/_src/scripts/plugins/utils.js'
        })
    ]
};
