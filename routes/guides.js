const express = require('express');
const router = express.Router();
const guideControllers = require('../controllers/guideControllers');
const { isLoggedIn } = require('../helpers/middlewares');

router.get('/', isLoggedIn(), guideControllers.getGuides)

router.post('/', isLoggedIn(), guideControllers.createGuide)

module.exports = router;