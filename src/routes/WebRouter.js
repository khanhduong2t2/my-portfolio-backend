const router = require('express').Router();

const WebController = require('../controllers/Website/WebController');

router.post('/create-item-web', WebController.createItemWeb);
router.get('/get-list-web', WebController.getListWeb);

router.post('/create-detail-web', WebController.createDetailWeb);
router.get('/get-detail-web', WebController.getDetailWeb);

module.exports = router;