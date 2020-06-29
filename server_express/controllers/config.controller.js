const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Config = mongoose.model('Config');
/*
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
}*/


module.exports.getConfig = (req, res, next) => {
    Config.find({}, 'title description').exec(function(err, post) {
        if (!post) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'post record not found.' });
        } else {
            console.log("Config found: ", post);
            return res.status(200).json({ posts: post });
        }
    });
}


module.exports.editConfig = (req, res, next) => {
    console.log("yo");
    console.log(req.body);
    Config.findOneAndUpdate({ title: req.body.title, description: req.body.description }).exec(function(err, post) {
        if (!post) {
            var post = new Config();
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
        } else {
            console.log("Post Edited: ", post);
            return res.status(200).json({ posts: post });
        }
    });
}