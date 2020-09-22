const mongoose = require('mongoose');

const PromotionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
})

const Promotion = module.exports = mongoose.model('Promotion', PromotionSchema);

module.exports.getPromotionByName = (name, cb) => {
    const query = {name: name};
    Promotion.findOne(query, cb);
}
module.exports.getAll = (cb) => {
    const query = {};
    Promotion.find(query, cb);
}