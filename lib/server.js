var net = require('net');
var GeoDb = require('./index');

var parseQuery = function (query) {
    var parts = query.toString().trim().split(' ');
    if (parts[0] === 'search') {
        return { method: 'search', arguments: [parts.slice(1, parts.length).map(parseFloat)] };
    }

    if (parts[0] === 'all') {
        return { method: 'all' };
    }
};

module.exports = {
    createServer: function (dbOptions, port) {
        var db = new GeoDb(dbOptions);
        var server = net.createServer(function (c) {
            c.on('data', function (query) {
                query = parseQuery(query);

                if (query) {
                    console.log('Got data', query);
                    var result = db[query.method].apply(db, query.arguments || []);
                    console.log('Found ', result.length, 'results');
                    c.write(JSON.stringify(result));
                    c.write("\n");
                }
            });
        });

        server.listen(port, function () {
            console.log('GeoDB server (' + dbOptions.filename + ') started on', port);
        });
    }
};
