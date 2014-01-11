var fs = require('fs');
var _ = require('underscore');

var oncePerLoop = require('./oncePerLoop');

var Persister = function (db, filename) {
    this.filename = filename;
    this.db = db;
    this.persist = oncePerLoop(this.persist.bind(this));
    this.db.on('insertedPoint', this.persist);
    this.loadFromDisk();
};

Persister.prototype.loadFromDisk = function () {
    if (!fs.existsSync(this.filename)) return;

    var json = JSON.parse(fs.readFileSync(this.filename));
    this.db.fromJSON(json);
};

Persister.prototype.persist = function () {
    console.log('Writing file');
    fs.writeFile(this.filename, JSON.stringify(this.db.toJSON(), null, 2));
};

module.exports = Persister;
