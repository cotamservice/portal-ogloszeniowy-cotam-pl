const mongoose = require('mongoose');

const MarkSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Mark = module.exports = mongoose.model('Mark', MarkSchema);

module.exports.getMarkByName = (name, cb) => {
    const query = {name: name};
    Mark.findOne(query, cb);
}
module.exports.getAll = (cb) => {
    const query = {};
    Mark.find(query, cb);
}