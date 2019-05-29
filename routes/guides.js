const express = require('express');
const router = express.Router();
const guideControllers = require('../controllers/guideControllers');
const { isLoggedIn } = require('../helpers/middlewares');

router.get('/', (req, res, next) => {
  console.log('hit the route')
})

router.post('/', isLoggedIn(), guideControllers.createGuide)

module.exports = router;