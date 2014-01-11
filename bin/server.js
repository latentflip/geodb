#!/usr/bin/env node
var argv = require('optimist')
            .usage('Count the lines in a file.\nUsage: $0')
            .demand('f')
            .alias('f', 'file')
            .describe('f', 'Database file to server (will be created if doesn\'t exist.')
            .demand('p')
            .alias('p', 'port')
            .describe('p', 'Port to run db server on.')
            .argv;

var server = require('../geodb').server;

var path = require('path');

var dbfile = path.resolve(process.cwd(), argv.f);

server.createServer({
    filename: dbfile
}, argv.p);

