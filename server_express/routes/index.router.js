const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlPost = require('../controllers/post.controller');
const ctrlUpload = require('../controllers/fileUpload.controller');
const ctrlConfig = require('../controllers/config.controller');

//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/admin/')
    },
    filename: function(req, file, cb) {
        var filename = Date.now();
        switch (file.mimetype) {
            case 'image/png':
                filename = filename + ".png";
                break;
            case 'image/jpeg':
                filename = filename + ".jpeg";
                break;
            case 'image/jpg':
                filename = filename + ".jpg";
                break;
            case 'video/mp4':
                filename = filename + ".mp4";
            case 'image/gif':
                filename = filename + ".gif";
                break;
            default:
                break;
        }
        cb(null, filename);
    }
});

var upload = multer({
    storage: storage
}).single('file');



const jwtHelper = require('../config/jwtHelper');

router.post('/admin/register', ctrlUser.register);
router.post('/admin/authenticate', ctrlUser.authenticate);
router.get('/admin/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/admin/cp/config/edit', ctrlConfig.editConfig);
router.get('/admin/cp/config', ctrlConfig.getConfig);
//router.get('/mediafiles/config', ctrlUpload.findMediaConfig);

router.post('/admin/cp/post', ctrlPost.newPost);
router.post('/admin/cp/posts/edit/:id', ctrlPost.editPostById);
router.get('/admin/cp/posts/delete/:id', ctrlPost.deletePostById);

router.get('/posts', ctrlPost.findPost);
router.get('/posts/:id', ctrlPost.findPostById);

router.post('/admin/cp/upload', upload, ctrlUpload.uploadFile);
router.get('/admin/cp/mediafiles/delete/:id', ctrlUpload.deleteMediaById);
router.get('/mediafiles', ctrlUpload.findMedia);
router.get('/mediafiles/:id', ctrlUpload.findMediaByPostId);





module.exports = router;