const router = require('express').Router();

const AppController = require('../controllers/App/AppController');

router.post('/create-item-menu', AppController.createItemMenu);
router.get('/get-menu', AppController.getMenu);

module.exports = router;