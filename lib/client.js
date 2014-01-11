var net = require('net');
var events = require('events');
var util = require('util');

function Request (client) {
    this.client = client;
}
util.inherits(Request, events.EventEmitter);


Request.prototype.send = function (message) {
    this.client.requests.push(this);
    this.client.tcp.write(message + '\r\n');
};

Request.prototype.response = function (data) {
    this.emit('response', data);
};

function Client (options) {
    this.tcp = net.connect(options.port);
    this.requests = [];
    this.tcp.on('data', this.onData.bind(this));
}

var message = '';
Client.prototype.onData = function (buffer) {
    var self = this;
    var data = buffer.toString();
    var reconstructData = function (data) {
        var json;
        var delimidx = data.indexOf('\n');
        if (delimidx === -1) {
            message += data;
            return;
        } else {
            message += data.substr(0, delimidx);
            self.requests.shift().response(JSON.parse(message));
            message = '';
            reconstructData(data.substr(delimidx + 1));
        }
    };

    reconstructData(data);
};


Client.prototype.search = function (range, cb) {
    var request = new Request(this);
    request.on('response', function (data) { cb(null, data); });
    request.send('search ' + range.join(' '));
};

Client.prototype.all = function (cb) {
    var request = new Request(this);
    request.on('response', function (data) { cb(null, data); });
    request.send('all');
};

module.exports = Client;

//var client = new Client();
//client.all(function (err, data) {
//    console.log(data.toString());
//});
//
//client.search([-20, -20, 20, 20], function (err, data) {
//    console.log('Search', data);
//});
