'use strict';

const server = require('./src')();
const config = require('./config');

server.create(config);
server.start();

