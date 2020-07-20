const bodyParser = require('body-parser');

module.exports = {
    bodyParser: bodyParser,
    configUse: (app) =>{
        app.use(bodyParser.json());
    },
}