'use strict';

//Uncomment all modules you need from the CL library
require('./plugins/cl.utils');

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

console.debug(CL.utils.hud());
