const mongoose = require('mongoose');

const username = "bronda";
const password = 'I%40%25%23loveyou5303';//encrypt
const dbName = 'bronda';
const uri = "mongodb+srv://" + username + ":" + password + "@bronda-ks5hs.mongodb.net/" + dbName + "?retryWrites=true&w=majority";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

function connect(errCb, sucCb){
    mongoose.connect(uri, options);
    mongoose.connection.on('connected', ()=>{
        sucCb();
    });
    mongoose.connection.on('error', (err)=>{
        errCb(err);
    });
}

module.exports = {
    mongoose: mongoose,
    connect: connect,
}