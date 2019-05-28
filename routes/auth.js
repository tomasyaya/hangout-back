const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), authControllers.me);
router.post('/login', isNotLoggedIn(), validationLoggin(), authControllers.login);
router.post('/signup', isNotLoggedIn(), validationLoggin(), authControllers.signup);
router.post('/logout', isLoggedIn(), authControllers.logout);

router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

module.exports = router;
