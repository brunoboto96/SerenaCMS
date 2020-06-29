const mongoose = require('mongoose');
const _ = require('lodash');

const Upload = mongoose.model('Upload');






module.exports.uploadFile = (req, res, next) => {

    var uploadFile = new Upload();
    uploadFile.path = req.file.path;
    uploadFile.type = req.file.mimetype;
    uploadFile.postId = req.body.postId;
    uploadFile.save((err, doc) => {
        if (!err) {
            //res.send(doc); 
            console.log("Records inserted: ",doc);       
            return res.status(200).json({ mediaFiles: doc });
        }
        else {
            if (err.code == 11000) {
                console.log(err);
                res.status(422).send(['ERROR.']);
            } else {
                console.log(err);
                return next(err);
            }
        }

    })
}

module.exports.findMedia = (req, res, next) => {
    Upload.find().exec(function (err, media) {
        if (!media) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'Media files record not found.' });
        } else {
            console.log("Media found: ", media);
            return res.status(200).json({ mediaFiles: media });
        }
    }
    );
}

module.exports.findMediaByPostId = (req, res, next) => {
    Upload.find({postId: req.params['id']}).exec(function (err, media) {
        if (!media) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'Media files record not found.' });
        } else {
            console.log(req.params['id'] + " found");
            return res.status(200).json({ mediaFiles: media });
        }
    }
    );
}

module.exports.deleteMediaById = (req, res, next) => {
    Upload.findByIdAndDelete({_id: req.params['id']}).exec(function (err, media) {
        if (!media) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'Media files record not found.' });
        } else {
            console.log(req.params['id'] + " deleted");
            return res.status(200).json({ status: req.params['id'] + " deleted" });
        }
    }
    );
}