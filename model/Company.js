const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');


const CompanySchema = mongoose.Schema({
    nip: {
        type: String,
        required: true
    },
    nipEu: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true
    },
    personSurname: {
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
    phone: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    }
});

const Company = module.exports = mongoose.model('Company', CompanySchema);