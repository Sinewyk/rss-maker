'use strict';


// If in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

var debug = require('debug')('App');

debug('App running in debug mode');

//@Todo: if more environments variable are needed,
//assert() them to ensure they are here with explicit errors

var server = require('http').createServer(function(req, res) {
    res.end('Hello World : ' + process.env.NODE_ENV);
});

var port = process.env.PORT || 5000;
server.listen(port, function() {
    debug('App listening on port ' + port);
});
