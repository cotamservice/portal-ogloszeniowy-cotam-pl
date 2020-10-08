const mongoose = require('mongoose');

const username = "cotam";
const password = 'cotam';
const dbName = 'cotam';
const uri = "mongodb+srv://" + username + ":" + password + "@cotam.v4bnb.mongodb.net/" + dbName + "?retryWrites=true&w=majority";
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