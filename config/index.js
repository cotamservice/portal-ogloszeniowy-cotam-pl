const express = require('./express');
const database = require('./database');
const cors = require('./cors');
const bodyParser = require('./bodyParser');
const rout = require('../rout');
const passport = require('./passport');

module.exports = {
    express,
    database,
    cors,
    bodyParser,
    rout,
    passport,
    port: 3000,
}


