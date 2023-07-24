const router = require('express').Router();

const IntroController = require('../controllers/Intro/IntroController');

router.post('/create-info-intro', IntroController.createInfoIntro);

module.exports = router;