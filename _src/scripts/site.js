'use strict';

//  Zurb Foundation 6.2.1 https://github.com/zurb/foundation-sites/tree/develop/js
require('../../node_modules/foundation-sites/js/foundation.core');
require('../../node_modules/foundation-sites/js/foundation.util.mediaQuery');

//Initialize JS that runs on all/multiple pages
require('./shared.js').init();

//Initialize JS that executes on a per page basis
var pagesArray = require('./pages.js').init();

var pages = {};

for (var i = 0; i < pagesArray.length; i++) {
    pages[pagesArray[i]] = require('./page/' + pagesArray[i] + '.js');

    if (document.body.id === pagesArray[i] + 'Page') {
        pages[pagesArray[i]].init();
    }
}

console.debug(utils.hud());
