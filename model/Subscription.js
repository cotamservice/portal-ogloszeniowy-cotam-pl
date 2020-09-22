const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postAmount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
})

const Subscription = module.exports = mongoose.model('Subscription', SubscriptionSchema);

module.exports.getSubscriptionByName = (name, cb) => {
    const query = {name: name};
    Subscription.findOne(query, cb);
}
module.exports.getAll = (cb) => {
    const query = {};
    Subscription.find(query, cb);
}