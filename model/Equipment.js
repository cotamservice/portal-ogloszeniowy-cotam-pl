const mongoose = require('mongoose');

const EquipmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const Equipment = module.exports = mongoose.model('Equipment', EquipmentSchema);


module.exports.getAll = (cb) => {
    const query = {};
    Equipment.find(query, cb);
}
