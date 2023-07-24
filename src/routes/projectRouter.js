const router = require('express').Router();

const ProjectController = require('../controllers/Project/ProjectController');

router.post('/create-info-project', ProjectController.createInfoProject);

module.exports = router;