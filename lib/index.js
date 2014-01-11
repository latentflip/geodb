var util = require('util');
var Rbush = require('rbush');
var events = require('events');
var Persister = require('./persistence');

var GeoDb = function (options) {
    this.tree = Rbush(9);
    if (options.filename) {
        this.persistence = new Persister(this, options.filename);
    }
};
util.inherits(GeoDb, events.EventEmitter);

GeoDb.prototype.load = function (points) {
    this.tree.load(points);
    this.emit('insertedPoint');
};

GeoDb.prototype.insertPoint = function (data, lat, lon) {
    this.tree.insert([lat, lon, lat, lon, data]);
    this.emit('insertedPoint');
};

['search', 'all'].forEach(function (method) {
    GeoDb.prototype[method] = function () {
        return this.tree[method].apply(this.tree, arguments);
    };
});

GeoDb.prototype.toJSON = function () {
    return this.tree.toJSON();
};

GeoDb.prototype.fromJSON = function (json) {
    this.tree.fromJSON(json);
};

module.exports = GeoDb;
