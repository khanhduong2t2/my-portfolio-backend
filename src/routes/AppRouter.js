const router = require('express').Router();

const AppController = require('../controllers/App/AppController');

router.post('/create-content-app', AppController.createContentApp);
router.get('/get-content-app', AppController.getContentApp);

module.exports = router;