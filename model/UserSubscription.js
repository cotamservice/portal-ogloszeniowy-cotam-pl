const mongoose = require('mongoose');

const UserSubscriptionSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    subscriptionId: {
        type: String,
        required: true
    },
    subscriptionName: {
        type: String,
        required: true
    },
    postAmount: {
        type: Number,
        required: true
    },
    postMade: {
        type: Number,
        required: true
    },
    startIn: {
        type: Date,
        required: true
    },
    endIn: {
        type: Date,
        required: true
    },
})

const UserSubscription = module.exports = mongoose.model('UserSubscription', UserSubscriptionSchema);

module.exports.getSubscriptionByUserId = (userId, cb) => {
    const query = {userId: userId};
    UserSubscription.findOne(query, cb);
}
module.exports.getAll = (cb) => {
    const query = {};
    UserSubscription.find(query, cb);
}