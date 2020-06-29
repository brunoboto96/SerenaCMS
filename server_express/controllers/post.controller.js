const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Post = mongoose.model('Post');

module.exports.newPost = (req, res, next) => {
    var post = new Post();
    post.title = req.body.title;
    post.description = req.body.description;
    post.save((err, doc) => {
        if (!err) {
            console.log("Record inserted: ", doc)
            return res.status(200).json({ posts: doc });

        } else {
            if (err.code == 11000)
                res.status(422).send(['ERROR.']);
            else
                return next(err);
        }

    });
}


module.exports.findPost = (req, res, next) => {
    Post.find({}, 'title description').exec(function (err, post) {
        if (!post) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'post record not found.' });
        } else {
            console.log("Post found: ", post);
            return res.status(200).json({ posts: post });
        }
    }
    );
}

module.exports.findPostById = (req, res, next) => {
    Post.findOne({ _id: req.params['id'] }, 'title description').exec(function (err, post) {
        if (!post) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'post record not found.' });
        } else {
            console.log("Post found: ", post);
            return res.status(200).json({ posts: post });
        }
    }
    );
}


module.exports.editPostById = (req, res, next) => {
    console.log("yo");
    console.log(req.body);
    Post.findOneAndUpdate({ _id: req.params['id'] }, {title: req.body.title, description: req.body.description}).exec(function (err, post) {
        if (!post) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'post record not found.' });
        } else {
            console.log("Post Edited: ", post);
            return res.status(200).json({ posts: post });
        }
    });
}


module.exports.deletePostById = (req, res, next) => {
    Post.findOneAndDelete({ _id: req.params['id'] }).exec(function (err, post) {
        if (!post) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'post record not found.' });
        } else {
            console.log("Post deleted: ", post);
            return res.status(200).json({ posts: post });
        }
    }
    );
}