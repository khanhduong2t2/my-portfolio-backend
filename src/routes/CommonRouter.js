const router = require('express').Router();

const CommonController = require('../controllers/Common/CommonController');
const FirebaseController = require('../controllers/Firebase/FirebaseController');

router.post('/create-item-menu', CommonController.createItemMenu);
router.get('/get-menu', CommonController.getMenu);

router.post('/upload-images-firebase', FirebaseController.uploadMultipleImages);

module.exports = router;