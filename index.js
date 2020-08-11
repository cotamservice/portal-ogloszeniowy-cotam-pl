const config = require('./config');
const rout = require('./rout');
const model = require('./model');
const passport = require('passport');

const path = require('path');

const app = config.express.createServer;
config.express.configUse(app);
config.cors.configUse(app);
config.bodyParser.configUse(app);
config.passport.configUse(app, passport);
config.passport.passport(passport);
// config.passport.passportGoogle(passport);
rout.configUse(app);

async function start() {
    config.database.connect((err) => {
        console.log('DATABASE CONNECT ERROR :: \n' + err);
    }, async () => {
        app.listen(config.port, async () => {
            console.log('Server run on ' + config.port);
        });
    });
}

start();



