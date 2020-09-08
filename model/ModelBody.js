const mongoose = require('mongoose');

const ModelBodySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    markId: {
        type: String,
        required: true
    },
})

const ModelBody = module.exports = mongoose.model('ModelBody', ModelBodySchema);

module.exports.getModelBodyByName = (name, cb) => {
    const query = {name: name};
    ModelBody.findOne(query, cb);
}
module.exports.getAllByMarkId = (markId, cb) => {
    const query = {markId: markId};
    ModelBody.find(query, cb);
}
module.exports.getAll = (cb) => {
    const query = {};
    ModelBody.find(query, cb);
}
