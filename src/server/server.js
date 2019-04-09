'use strict';

const path = require('path');
const express = require('express');

const proxyHandler = require('./proxy');
// const { __ENV__ } = require('./config');

const DIST_DIR = path.resolve(__dirname, '../../dist');
const app = express();

// Match all the request to serve static assets
app.use(express.static(DIST_DIR));

// Proxy to hub api
app.get('/proxy/*', proxyHandler);

// Match all the other requests and return the HTML entry
app.use('*', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

module.exports = app;
