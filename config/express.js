const express = require('express');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

module.exports = {
    express: express,
    createServer: express(),
    configUse: (app) => {
        app.use(express.static(publicDir));
    },
}