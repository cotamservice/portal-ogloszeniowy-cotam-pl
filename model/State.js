const mongoose = require('mongoose');

const StateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const State = module.exports = mongoose.model('State', StateSchema);


module.exports.getAll = (cb) => {
    const query = {};
    State.find(query, cb);
}
