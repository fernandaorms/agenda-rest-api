const express = require('express');

const TokenController = require('../controllers/TokenController');

const router = express.Router();

router.post('/', TokenController.create);

module.exports = router;
