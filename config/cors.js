const cors = require('cors');

module.exports = {
    cors: cors,
    configUse: (app)=>{
        app.use(cors());
    }
}