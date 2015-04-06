'use strict';

var assert = require('assert');

// If in development
if (process.env.NODE_ENV !== 'production') {
    assert(
        require('dotenv').config({silent: true}),
        'Don\'t forget the .env file'
    );
}

var debug = require('debug')('App');
debug('App running in debug mode');

var scrapper = require('./mangaHereTransformer');
var RSS = require('rss');

var server = require('http').createServer(function requestHandler(req, res) {
    if (req.url !== '/rss') {
        res.statusCode = 404;
        debug('404');
        return res.end(null);
    }
    debug('processing rss request');
    var feed = new RSS({
        title: 'MangaHere generated feed',
        feed_url: 'http://www.mangahere.co/latest/',
        site_url: 'http://www.mangahere.co',
        ttl: '5'
    });
    scrapper().run(function(err, data) {
        if (err) {
            res.statusCode = 500;
            return res.end();
        }
        data.forEach(function(_manga) {
            feed.item({
                title:  _manga.title,
                url: _manga.link
            });
        });
        res.end(feed.xml());
    });
});

var port = process.env.PORT || 5000;
server.listen(port, function() {
    debug('App listening on port ' + port);
});
