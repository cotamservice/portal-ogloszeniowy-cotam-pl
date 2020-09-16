const mongoose = require('mongoose');

const FuilSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const Fuel = module.exports = mongoose.model('Fuil', FuilSchema);


module.exports.getAll = (cb) => {
    const query = {};
    Fuel.find(query, cb);
}
