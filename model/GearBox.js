const mongoose = require('mongoose');

const GearBoxSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const GearBox = module.exports = mongoose.model('GearBox', GearBoxSchema);


module.exports.getAll = (cb) => {
    const query = {};
    GearBox.find(query, cb);
}
