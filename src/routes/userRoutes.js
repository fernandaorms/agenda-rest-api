const express = require('express');
const userController = require('../controllers/UserController');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/', userController.create);
router.get('/', loginRequired, userController.index);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
