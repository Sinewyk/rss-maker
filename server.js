const assert = require('assert');

// If in development
if (process.env.NODE_ENV !== 'production') {
  assert(
    require('dotenv').config({ silent: true }),
    "Don't forget the .env file"
  );
}

const debug = require('debug')('App');
debug('App running in debug mode');

const scrapper = require('./mangaHereTransformer');
const RSS = require('rss');

const server = require('http').createServer((req, res) => {
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

  scrapper()((err, data) => {
    if (err) {
      res.statusCode = 500;
      return res.end();
    }

    data.forEach(_manga =>
      feed.item({
        title: _manga.title,
        url: _manga.link
      })
    );

    res.end(feed.xml());
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  debug('App listening on port ' + port);
});
