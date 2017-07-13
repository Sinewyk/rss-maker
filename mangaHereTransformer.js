const xray = require('x-ray');

module.exports = () =>
  xray('http://www.mangahere.co/latest/').select([
    {
      $root: 'dd',
      title: 'a[title]',
      link: 'a[href]'
    }
  ]);
