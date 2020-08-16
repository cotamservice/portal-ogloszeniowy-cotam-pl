const root = require('./root');
const account = require('./account');
const gus = require('./gus');

module.exports = {
    configUse: (app) => {
        app.use('/', root);
        app.use('/account', account);
        app.use('/gus', gus);
    }
}