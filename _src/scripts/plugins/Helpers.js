'use strict';

//For handlebars
module.exports = {
    ifEqual: function(a, b, opts) {
        if (a === b) {
            return opts.fn(this);

        } else {
            return opts.inverse(this);
        }
    },

    ifIn: function(elem, list, opts) {
        if (list.indexOf(elem) > -1) {
            return opts.fn(this);
        }
        return opts.inverse(this);
    },

    lower: function(string) {
        return String(string).toLowerCase();
    }
};