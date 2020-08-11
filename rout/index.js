const root = require('./root');
const account = require('./account');

module.exports = {
    configUse: (app) => {
        app.use('/', root);
        app.use('/account', account);
    }
}