const router = require('express').Router();

const IntroController = require('../controllers/Intro/IntroController');

router.post('/create-info-intro', IntroController.createInfoIntro);
router.get('/get-content-banner', IntroController.getContentBanner);

module.exports = router;