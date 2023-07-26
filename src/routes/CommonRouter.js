const router = require('express').Router();

const CommonController = require('../controllers/Common/CommonController');

router.post('/create-item-menu', CommonController.createItemMenu);
router.get('/get-menu', CommonController.getMenu);

module.exports = router;