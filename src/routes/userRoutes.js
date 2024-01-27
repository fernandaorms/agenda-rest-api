const express = require('express');

const userController = require('../controllers/UserController');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.get('/', userController.index);
// router.get('/:id', userController.show);

router.post('/', userController.create);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

module.exports = router;
