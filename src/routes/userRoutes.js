const express = require('express');

const userController = require('../controllers/UserController');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

// router.get('/', userController.index);

router.post('/', userController.create);
router.get('/', loginRequired, userController.show);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

module.exports = router;
