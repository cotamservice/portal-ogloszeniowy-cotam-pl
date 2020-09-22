const root = require('./root');
const account = require('./account');
const gus = require('./gus');
const mark = require('./mark');
const salon = require('./salon');
const state = require('./state');
const drive = require('./drive');
const fuel = require('./fuel');
const gearbox = require('./gearbox');
const equipment = require('./equipment');
const promotion = require('./promotion');
const subscription = require('./subscription');
const usersubscription = require('./usersubscription');

module.exports = {
    configUse: (app) => {
        app.use('/', root);
        app.use('/account', account);
        app.use('/gus', gus);
        app.use('/mark', mark);
        app.use('/salon', salon);
        app.use('/state', state);
        app.use('/drive', drive);
        app.use('/fuel', fuel);
        app.use('/gearbox', gearbox);
        app.use('/equipment', equipment);
        app.use('/promotion', promotion);
        app.use('/subscription', subscription);
        app.use('/usersubscription', usersubscription);
    }
}