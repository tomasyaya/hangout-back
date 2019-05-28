const express = require('express');
const router = express.Router();
const guideControllers = require('../controllers/guideControllers');

router.get('/', (req, res, next) => {
  console.log('hit the route')
})

router.post('/', guideControllers.createGuide)

module.exports = router;