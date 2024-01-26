const express = require('express');
const contactController = require('../controllers/ContactController');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/', loginRequired, contactController.create);
router.get('/', loginRequired, contactController.index);


module.exports = router;
