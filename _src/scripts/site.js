'use strict';

//Initialize JS that runs on all/multiple pages
require('./shared.js').init();

//add js that pertains to html page
var pagesArray = [
    'home'
];

var pages = {};

for (var i = 0; i < pagesArray.length; i++) {
    pages[pagesArray[i]] = require('./page/' + pagesArray[i] + '.js');

    if (document.body.id === pagesArray[i] + 'Page') {
        pages[pagesArray[i]].init();
        //require('./pages/' + pagesArray[i] + '.js').init();
    }
}

console.debug(Utils.bp());
