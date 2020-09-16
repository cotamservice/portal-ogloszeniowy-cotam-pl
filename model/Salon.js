const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');


const SalonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phones: {
        type: Array,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    }
});

const Salon = module.exports = mongoose.model('Salon', SalonSchema);


module.exports.getAllByUserId = (creatorId, cb) => {
    const query = {creatorId: creatorId};
    Salon.find(query, cb);
}
