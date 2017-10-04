const x = require('x-ray')();

module.exports = () =>
  x('http://www.mangahere.co/latest/', 'dd', [{ title: 'a', link: 'a@href' }]);
