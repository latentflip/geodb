var GeoDb = require('./index');

var db = new GeoDb({
    filename: __dirname + '/test-persist.db'
});

var db2 = new GeoDb({
    filename: __dirname + '/test-persist2.db'
});

//var data = require('./test-data.json');
var n = function () {
    return Math.floor(Math.random() * 100) - 50;
};

var data = require('../test-data.json');

Object.keys(data).forEach(function ()
console.log(data);

