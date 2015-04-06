'use strict';

var xray = require('x-ray');

module.exports = function() {
    return xray('http://www.mangahere.co/latest/')
        .select([{
            $root: 'dd',
            title: 'a[title]',
            link: 'a[href]'
        }]);
};
