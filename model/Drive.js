const mongoose = require('mongoose');

const DriveSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const Drive = module.exports = mongoose.model('Drive', DriveSchema);


module.exports.getAll = (cb) => {
    const query = {};
    Drive.find(query, cb);
}
