const config = require('../config');
const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secretWord: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        required: true
    },
    isGoogleAuthenticate: {
        type: Boolean,
        required: true
    },
    isFBAuthenticate: {
        type: Boolean,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByEmail = (email, cb) => {
    const query = {email: email};
    User.findOne(query, cb);
}
module.exports.getUserById = (id, cb) => {
    User.findById(id, cb);
}
module.exports.addUser = (userToAdd, cb) => {
    bCrypt.genSalt(10, (err, salt) => {
        bCrypt.hash(userToAdd.password, salt, (err, hash) => {
            if (err) throw err;
            userToAdd.password = hash;
            userToAdd.save(cb);
        });
    })
}
module.exports.comparePass = (passToCompare, passCompareWith, cb) => {
    bCrypt.compare(passToCompare, passCompareWith, (err, isMatch) => {
        if (err) throw err;
        cb(null, isMatch);
    });
}

module.exports.role = {
    individual: 'individual',
    commission: 'commission',
    broker: 'broker',
    user: 'service_user'
}
