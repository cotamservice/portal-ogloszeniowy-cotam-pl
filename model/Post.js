const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const Post = module.exports = mongoose.model('Post', PostSchema);


module.exports.getAll = (cb) => {
    const query = {};
    Post.find(query, cb);
}
