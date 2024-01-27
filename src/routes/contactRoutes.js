const express = require('express');

const contactController = require('../controllers/ContactController');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/', loginRequired, contactController.create);
router.get('/', loginRequired, contactController.index);
router.get('/:id', loginRequired, contactController.show);
router.put('/:id', loginRequired, contactController.update);
router.delete('/:id', loginRequired, contactController.delete);


module.exports = router;
