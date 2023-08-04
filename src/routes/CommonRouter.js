const router = require('express').Router();

const CommonController = require('../controllers/Common/CommonController');
const FirebaseController = require('../controllers/Firebase/FirebaseController');

router.post('/create-item-menu', CommonController.createItemMenu);
router.get('/get-menu', CommonController.getMenu);

router.post('/save-url-image', CommonController.saveUrlImage);
router.get('/get-url-image', CommonController.getUrlImage);

router.post('/upload-images-firebase', FirebaseController.uploadMultipleImages);

router.get('/get-list-products', CommonController.getListProducts);

module.exports = router;