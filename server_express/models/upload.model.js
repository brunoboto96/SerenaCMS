const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var uploadSchema = new mongoose.Schema({
    path: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    }
});

mongoose.model('Upload', uploadSchema);