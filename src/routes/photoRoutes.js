const express = require('express');

const upload = require('../config/multer');
const photoController = require('../controllers/PhotoController');
const multerErrorHandler = require('../middlewares/multerErrorHandler');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/', loginRequired, upload.array('photos', 5), multerErrorHandler, photoController.create);

module.exports = router;
