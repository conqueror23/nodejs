#!/usr/bin/env node
var app = require('./app');
var io = require('./io');
var server = require('http').Server(app);

io.attach(server);
server.listen(3000);
